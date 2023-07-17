import store from 'src/store/store';
import { Button } from 'src/components/atoms/button/button';
import { RadioGroup } from 'src/components/molecules/radio-group/radio-group';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Toggle } from 'src/components/atoms/toggle';
import { Input } from 'src/components/atoms/input/input';
import {
  resetQuestions,
  setAddChoices,
  setAddQuestion,
  setChoices,
  setCreatedQuestions,
  setQuestionProjectIds,
  setQuestionType,
  setRequiredQuestion,
} from 'src/store/reducers/createQuestionWizard.reducer';
import { dialog } from 'src/core/dialog/dialog';
import { resetCreatePostWizard } from 'src/store/reducers/createPostWizard.reducer';
import { printWhen } from 'src/core/utils';
import { CreateQuestionPayload } from 'src/core/types';
import { QUESTION_TYPE, createQuestion } from '../screener-questions.service';
import { useScreenerQuestionsShared } from '../screener-questions.shared';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const { navigate, dispatch, formState, form, question } = useScreenerQuestionsShared();

  function submitSkip() {
    dialog.alert({ title: 'Successfully', message: 'You have successfully created a job post' }).then(() => {
      navigate({ to: `/m/jobs/created/${formState.question_project_id.identity_id}` });
      store.dispatch(resetCreatePostWizard());
    });
  }

  function submitWithQuestions() {
    const payloadQuestion: CreateQuestionPayload =
      formState.question_type === 'MULTIPLE'
        ? {
            question: question.question,
            required: question.required,
            options: question.options as string[],
          }
        : {
            question: question.question,
            required: question.required,
          };
    dispatch(setCreatedQuestions([...formState.created_questions, question]));
    createQuestion(payloadQuestion, formState.question_project_id.project_id).then((resp) => {
      dispatch(setQuestionProjectIds({ ...formState.question_project_id, question_id: resp.id }));
      store.dispatch(resetQuestions());
      navigate({ to: `created/${formState.question_project_id.identity_id}` });
      form.reset();
    });
  }

  const addQuestionsJSX = (
    <div className={css.questions}>
      <RadioGroup
        name="question-type"
        value={formState.question_type}
        onChange={(value) => {
          dispatch(setQuestionType(value));
          dispatch(setAddChoices(0));
        }}
        list={QUESTION_TYPE}
        label="Question type"
      />
      <Textarea
        register={form}
        label="Question"
        placeholder="Question"
        name="question"
        defaultValue={formState.question}
      />
      <div className={css.questions__required}>
        Require this question to be answered
        <Toggle
          name="required"
          checked={formState.required_question}
          onChange={(value) => dispatch(setRequiredQuestion(value))}
        />
      </div>
    </div>
  );

  const multipleChoiceJSX = (
    <>
      <div className={css.addQuestions} onClick={() => dispatch(setAddChoices(formState.add_choices + 1))}>
        <img src="/icons/add-circle.svg" />
        Add choice
      </div>
      {printWhen(<div className={css.error}>Minimum of 2 choices required.</div>, formState.add_choices === 1)}
      {printWhen(
        <div className={css.choices}>
          {Array.from({ length: formState.add_choices }).map((_, index) => (
            <div key={index} className={css.choice}>
              <Input
                placeholder={`Choice ${index + 1}`}
                register={form}
                name={`choice-${index + 1}`}
                onKeyUp={(e) =>
                  dispatch(setChoices({ ...formState.choices, [`choice-${index + 1}`]: e.currentTarget.value }))
                }
              />
              <img src="/icons/trash-bin.svg" onClick={() => dispatch(setAddChoices(formState.add_choices - 1))} />
            </div>
          ))}
        </div>,
        formState.add_choices > 0
      )}
    </>
  );

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: `/jobs/create/info` })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Create job</div>
      </div>
      <div className={css.screener}>
        Screener questions
        <span className={css.screener__subtitle}>Add up to 5 screener questions.</span>
      </div>
      <div className={css.main}>
        {printWhen(
          <div className={css.addQuestions} onClick={() => dispatch(setAddQuestion(true))}>
            <img src="/icons/add-circle.svg" />
            Add question
          </div>,
          !formState.add_question
        )}
        {printWhen(addQuestionsJSX, formState.add_question)}
        {printWhen(multipleChoiceJSX, formState.question_type === 'MULTIPLE')}
      </div>
      <div className={css.btnContainer}>
        {printWhen(
          <Button color="white" onClick={submitSkip}>
            Skip
          </Button>,
          !formState.add_question
        )}
        {printWhen(
          <>
            <Button
              color="blue"
              disabled={
                formState.question_type === 'MULTIPLE' ? !form.isValid || formState.add_choices <= 1 : !form.isValid
              }
              onClick={submitWithQuestions}
            >
              Add
            </Button>
            <Button color="white" onClick={submitSkip}>
              Cancel
            </Button>
          </>,
          formState.add_question
        )}
      </div>
    </div>
  );
};

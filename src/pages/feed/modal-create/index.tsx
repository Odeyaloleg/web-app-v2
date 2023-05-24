import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { WebModal } from 'src/components/templates/web-modal';
import { Dropdown } from 'src/components/atoms/dropdown/dropdown';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { socialCausesToDropdownAdaptor } from 'src/core/adaptors';
import { ModalCreateProps } from './modal-create.types';
import { ModalReview } from '../modal-review';
import css from './modal-create.module.scss';

export const ModalCreate: React.FC<ModalCreateProps> = ({ open, onClose, setFeedList }) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const intialValue = { social: '', text: '', imgUrl: '' };
  const [state, setState] = useState(intialValue);

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  const isDisable = () => {
    return [state.social, state.text].every((item) => !!item);
  };

  const getSocialValue = (value: string) => {
    setState({ ...state, social: value });
  };

  const onChangeTextHandler = (e: any) => {
    const value = e.target.value;
    setState({ ...state, text: value });
  };

  const imagUpload = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setState({ ...state, imgUrl: '' });
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setState({ ...state, imgUrl: objectUrl });
  }, [selectedFile]);

  return (
    <>
      <WebModal
        open={open}
        onClose={onClose}
        header="Create post"
        footerClassName={css.footer}
        buttons={[
          {
            children: 'Next',
            color: 'blue',
            className: css.btn,
            disabled: !isDisable(),
            onClick: () => {
              onClose();
              setOpenReviewModal(true);
            },
          },
        ]}
      >
        <>
          <div className={css.social}>
            <Avatar img={avatarImg} type={identity.type} />
            <Dropdown
              containerClassName={css.dropdown}
              placeholder="Social Cause"
              list={socialCausesToDropdownAdaptor()}
              onGetValue={getSocialValue}
              selectedValue={state.social}
            />
          </div>

          <div className={css.text}>
            <Textarea
              rows="15"
              variant="outline"
              placeholder="I feel like ..."
              value={state.text}
              onChange={onChangeTextHandler}
              className={css.textbox}
            />
          </div>

          <div className={css.image}>
            <img src="icons/image.svg" />
            <input type="file" onChange={imagUpload} />
          </div>
        </>
      </WebModal>
      <ModalReview
        open={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        soucialValue={state.social}
        text={state.text}
        imgFile={selectedFile || ''}
        imgUrl={state.imgUrl}
        setFeedList={setFeedList}
        onDone={() => {
          setState(intialValue);
          setSelectedFile(undefined);
        }}
      />
    </>
  );
};

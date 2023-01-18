import { useState } from 'react';
import css from './steps.module.scss';
import { StepsProps } from './steps.types';

export const Steps = (props: StepsProps): JSX.Element => {
  const { length, current, autoPlay, onStepClick, clickable = true, ...rest } = props;
  const steps: number[] = Array.from(Array(length).keys());
  const [step, setStep] = useState(current);

  function setActiveStyle(i: number, current: number) {
    return i === current - 1 ? `${css.active}` : '';
  }

  function click(i: number) {
    return () => {
      if (clickable === true) {
        setStep(i + 1);
        onStepClick?.(i + 1);
      }
    };
  }

  function update(v: number): number {
    if (v + 1 > length) {
      onStepClick?.(1);
      return 1;
    }
    onStepClick?.(v + 1);
    return v + 1;
  }

  return (
    <div style={rest} className={css.container}>
      {steps.map((i) => (
        <div
          onClick={click(i)}
          data-testid="step"
          className={`${css.step} ${setActiveStyle(i, step)}`}
          key={i}
        />
      ))}
    </div>
  );
};

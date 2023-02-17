import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { REGEX } from '../../../../core/constants/REGEX';
import { Button } from '../../../atoms/button/button';
import { Input } from '../../../atoms/input/input';
import { Link } from '../../../atoms/link/link';
import { Typography } from '../../../atoms/typography/typography';
import { BottomStatic } from '../../../templates/bottom-static/bottom-static';
import css from './sign-up-user-email.module.scss';
import { preRegister } from './sign-up-user-email.services';

export const SignUpUserEmail = (): JSX.Element => {
  const { register, handleSubmit, formState } = useForm();

  const navigate = useNavigate();

  function onSubmit({ email }: { email: string }) {
    preRegister({ email })
      .then(() => localStorage.setItem('email', email))
      .then(() => navigate({ to: '../verification' }));
  }

  return (
    <BottomStatic>
      <div className={css.top}>
        <div className={css.header}>
          <Typography marginBottom=".5rem" type="heading" size="l">
            Join Socious
          </Typography>
          <Typography color="var(--color-gray-01)" type="body">
            Create an account and start
          </Typography>
        </div>
        <Input
          register={register}
          name="email"
          validations={{ pattern: REGEX.email }}
          label="Enter your email address"
          placeholder="Email"
        />
      </div>
      <div>
        <div className={css.bottom}>
          <Button disabled={!formState.isValid} onClick={handleSubmit(onSubmit)}>Continue</Button>
          <Typography marginTop="1rem">
            <span>Already a member? </span>
            <Link onClick={() => navigate({ to: '/sign-in' })}>Sign in</Link>
          </Typography>
        </div>
      </div>
    </BottomStatic>
  );
};

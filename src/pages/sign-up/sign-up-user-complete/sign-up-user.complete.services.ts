import { Validator } from '../../../components/atoms/password-quality/password-quality.types';
import { post } from '../../../core/http';

export function updateProfile(payload: { firstName: string; lastName: string }) {
  const adopted = {
    first_name: payload.firstName,
    last_name: payload.lastName,
  };
  return post('/user/update/profile', adopted);
}

export const passwordQualityValidators: Validator[] = [
  { name: 'characters', amount: 7 },
  { name: 'number', amount: 1 },
];

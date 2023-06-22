import { required } from '../../../core/form';
import { email } from '../../../core/form/customValidators/customValidators';
import { FormModel } from '../../../core/form/useForm/useForm.types';
import { CreateOrgWizard } from '../../../store/reducers/createOrgWizard.reducer';

export function formModel(formState: CreateOrgWizard): FormModel {
  return {
    organizationName: { initialValue: formState.organizationName, validators: [required()] },
    bio: { initialValue: formState.bio, validators: [required()] },
    organizationEmail: { initialValue: formState.organizationEmail, validators: [required(), email()] },
    address: { initialValue: formState.address },
    countryMobileCode: { initialValue: formState.countryMobileCode },
    phoneNumber: { initialValue: formState.phoneNumber },
    website: { initialValue: formState.website },
    country: { initialValue: formState.country, validators: [required()] },
    city: { initialValue: formState.city, validators: [required()] },
    agreement: { initialValue: formState.agreement, validators: [required()]},
  };
}

import { object, string, ref } from 'yup';

const passwordValidationSchema = object({
  oldPassword: string().required("Old Password is Required").min(6),
  newPassword: string().required("New Password is Required").min(6),
  retypePassword: string()
    .oneOf([ref('newPassword'), null], 'Passwords Do not match')
    .required('Retype Password is Required'),
});

export default passwordValidationSchema;

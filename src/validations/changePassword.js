import * as yup from 'yup';

const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Must contain at least 8 characters')
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase letter')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase letter')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
    .matches(
      /^(?=.*[!@#$%^&*])/,
      'Must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm new password is required'),
});

export default changePasswordSchema;

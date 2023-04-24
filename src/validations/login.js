import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must be valid'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Must Contain 8 Characters')
    .matches(/^(?=.*[a-z])/, 'Must Contain One Lowercase Character')
    .matches(/^(?=.*[A-Z])/, 'Must Contain One Uppercase Character')
    .matches(/^(?=.*[0-9])/, 'Must Contain One Number Character')
    .matches(
      /^(?=.*[!@#\\$%\\^&\\*])/,
      'Must Contain  One Special Case Character'
    ),
});

export default loginSchema;

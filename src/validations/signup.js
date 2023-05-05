import * as yup from 'yup';

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must be valid'),
  username: yup.string().required('Password is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Must Contain 8 Characters')
    .matches(/^(?=.*[a-z])/, 'Must Contain One Lowercase Character')
    .matches(/^(?=.*[A-Z])/, 'Must Contain One Uppercase Character')
    .matches(/^(?=.*[0-9])/, 'Must Contain One Number Character')
    .matches(/^(?=.*[!@#$%^&*()])/, 'Must Contain  One Special Case Character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Both', 'None'], 'Please select valid gender'),
});

export default signupSchema;

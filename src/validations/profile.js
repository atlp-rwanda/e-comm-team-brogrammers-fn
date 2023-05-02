import * as yup from 'yup';

const profileSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must be valid'),
  username: yup.string(),
  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Both', 'None'], 'Please select valid gender'),
});

export default profileSchema;

import * as yup from 'yup';

const messageSchema = yup.object().shape({
  username: yup.string(),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must be valid'),
  message: yup.string(),
});

export default messageSchema;

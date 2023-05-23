import * as yup from 'yup';

const orderSchema = yup.object().shape({
  country: yup.string().required('Email is required'),
  city: yup.string().required('Password is required'),
  street: yup.string().required('Password is required'),
});

export default orderSchema;

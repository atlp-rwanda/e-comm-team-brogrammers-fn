import * as yup from 'yup';

const orderStatusSchema = yup.object().shape({
  status: yup.string().required('Status is required'),
});

export default orderStatusSchema;

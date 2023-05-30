import * as yup from 'yup';

const messageSchema = yup.object().shape({
  message: yup.string().min(1).trim().required(),
});
export default messageSchema;

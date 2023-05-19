import * as yup from 'yup';

const addMax = (field) => (quantity) => {
  if (quantity) {
    return field.max(quantity);
  }
  return field;
};

const createCartSchema = (quantity) =>
  yup.object().shape({
    quantity: addMax(
      yup
        .number()
        .typeError('Amount must be a number')
        .required('Quantity is required')
        .min(1)
    )(quantity),
  });
export default createCartSchema;

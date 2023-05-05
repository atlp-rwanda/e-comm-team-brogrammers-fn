import * as yup from 'yup';

const addItemSchema = yup.object().shape({
  name: yup
    .string()
    .required('title is required')
    .min(3, 'Contain atleast 3 Characters'),
  description: yup
    .string()
    .required('Password is required')
    .min(5, 'Contain atleast 5 Characters')
    .max(10000, 'Contain maximum 10000 Characters'),
  category: yup.string().required('category is required'),
  price: yup
    .number()
    .required('price is required')
    .min(0, 'price must be above 0 USD'),
  quantity: yup
    .number()
    .required('quantity is required')
    .min(0, 'quantity must be above 0 USD'),
  expdate: yup
    .date()
    .required('please add expired date')
    .min(new Date(), 'expired date must be tthe future date'),
});

export default addItemSchema;

import * as yup from 'yup';

const ReviewSchema = yup.object().shape({
  feedback: yup.string().required('Feedback is required'),
  rating: yup
    .string()
    .required('rating is required')
    .oneOf(['1', '2', '3', '4', '5'], 'Please select valid rate'),
});

export default ReviewSchema;

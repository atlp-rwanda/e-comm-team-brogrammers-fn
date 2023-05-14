import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from './input';
import Select from './select';
import ReviewSchema from '../validations/addReview';
import editReviewThunk from '../redux/features/actions/editReview';
import { showSuccessMessage } from '../utils/toast';

function UpdateReview({ review }) {
  const dialog = useRef();
  const dispatch = useDispatch();

  const close = (e) => {
    const dialogDimensions = dialog.current?.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.current.close();
    }
  };

  const { isLoading } = useSelector((state) => state.editReview);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ReviewSchema),
  });

  const submit = async (data) => {
    const { feedback, rating } = data;
    const revId = review.id;

    await dispatch(editReviewThunk({ reviewId: revId, feedback, rating }));
    dialog.current.close();
    showSuccessMessage('Review edited and submitted');
  };

  useEffect(() => {
    setValue('rating', review.rating); // Set the initial value of 'rating' field
    dialog.current?.addEventListener('click', close);
    return () => {
      dialog.current?.removeEventListener('click', close);
    };
  }, [dialog, dialog.current, setValue]);

  return (
    <>
      <dialog ref={dialog} className="add-cart-dialog" data-testid="dialog">
        <div>
          <h3> Edit Your Review</h3>
          <form onSubmit={handleSubmit(submit)}>
            <div className="form-group">
              <Input
                className="form-control"
                id="feedback"
                defaultValue={review.feedback}
                name="feedback"
                register={register('feedback')}
              />
              {errors.feedback && (
                <p className="error" style={{ color: 'red' }}>
                  {errors.feedback.message}
                </p>
              )}
            </div>
            <div className="form-group">
              <Select
                className="form-control"
                id="review-rate"
                name="rating"
                register={register('rating')}
                defaultValue={review.rating} // Set the default value of the 'rating' field
              >
                <option value="0">Review Rate:</option>
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
              </Select>
              <br />
            </div>
            {errors.rating && (
              <p className="error" style={{ color: 'red' }}>
                {errors.rating.message}
              </p>
            )}
            <div>
              <button type="submit" className="btn1">
                {isLoading ? 'updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <i
        className="fa-solid fa-edit spinnerDiv"
        aria-hidden="true"
        onClick={() => dialog.current.showModal()}
      />
    </>
  );
}

export default UpdateReview;

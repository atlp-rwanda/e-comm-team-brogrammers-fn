/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from './input';
import Select from './select';
import ReviewSchema from '../validations/addReview';

import addReviewThunk from '../redux/features/actions/giveReview';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';

function ReviewDialog({ product }) {
  const { user } = useSelector((state) => state.user);

  const dialog = useRef();
  const dispatch = useDispatch();
  const closeModel = () => {
    if (typeof dialog.current.close === 'function') dialog.current.close();
  };
  const openModel = () => {
    if (typeof dialog.current.showModal === 'function')
      dialog.current.showModal();
  };

  const close = (e) => {
    const dialogDimensions = dialog.current?.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModel();
    }
  };
  const { status } = useSelector((state) => state.addReview);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ReviewSchema),
  });

  const submit = async (data) => {
    const { feedback, rating } = data;
    const { id } = product;
    if (product.seller.email === user.email) {
      showErrorMessage("You can't review yourself.");
      return;
    }

    dispatch(addReviewThunk({ productId: id, feedback, rating }));
    closeModel();
    reset();
    showSuccessMessage('Review submitted');
    // Close the dialog
  };

  useEffect(() => {
    dialog.current?.addEventListener('click', close);
    return () => {
      dialog.current?.removeEventListener('click', close);
    };
  }, [dialog, dialog.current]);

  return (
    <>
      <dialog ref={dialog} className="add-cart-dialog" data-testid="dialog">
        <div>
          <h3>Review This Product</h3>
          <form onSubmit={handleSubmit(submit)}>
            <div className="form-group">
              <Input
                className="form-control"
                id="feedback"
                placeholder="How do you feel about this product"
                name="feedback"
                register={register('feedback')}
              />
            </div>
            {errors.feedback && (
              <p className="error" style={{ color: 'red' }}>
                {errors.feedback.message}
              </p>
            )}
            <div className="form-group">
              <Select
                className="form-control"
                id="review-rate"
                name="rating"
                register={register('rating')}
              >
                <option value="0">Review Rate:</option>
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5" data-testid="review-rate">
                  5 stars
                </option>
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
                {status === 'loading' ? 'Submitting...' : 'Confirm'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <button type="button" onClick={() => openModel()}>
        Submit Review
      </button>
    </>
  );
}

export default ReviewDialog;

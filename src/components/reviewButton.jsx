import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateReview from './updateReviewDialog';
import deleteReviewThunk from '../redux/features/actions/deleteReview';
import { showSuccessMessage } from '../utils/toast';

function ReviewButton({ reviewer }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.deleteReview[reviewer.id]);

  const handleDelete = async (rID) => {
    await dispatch(deleteReviewThunk(rID));
    showSuccessMessage('Review Deleted');
  };

  return (
    <>
      {isLoading === true ? (
        <i className="fa fa-spinner fa-spin spinnerDiv" />
      ) : (
        <i
          className="fa-solid fa-trash delete-icon"
          aria-hidden="true"
          onClick={() => handleDelete(reviewer.id)}
        />
      )}
      <UpdateReview review={reviewer} />
    </>
  );
}

export default ReviewButton;

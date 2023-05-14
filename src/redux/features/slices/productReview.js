import { createSlice } from '@reduxjs/toolkit';
import reviewthunk from '../actions/productReview';
import addReviewThunk from '../actions/giveReview';
import deleteReviewThunk from '../actions/deleteReview';
import editReviewThunk from '../actions/editReview';

const initialState = {
  review: [], // Initialize as an empty array
  status: 'idle',
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(reviewthunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.review = payload;
      })
      .addCase(addReviewThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.review.allReviews.results = [
          payload,
          ...state.review.allReviews.results,
        ];
        state.review.totalRates = payload.totalRates;
        // Add the new review to the existing array
      })
      .addCase(deleteReviewThunk.fulfilled, (state, { payload }) => {
        if (!payload.error) {
          state.review.allReviews.results =
            state.review.allReviews.results.filter(
              (item) => item.id !== payload.review.id,
              (state.review.totalRates = payload.totalRates)
            );
        }
      })
      .addCase(editReviewThunk.fulfilled, (state, { payload }) => {
        if (!payload.error) {
          const updatedReviewIndex = state.review.allReviews.results.findIndex(
            (item) => item.id === payload?.id
          );
          if (updatedReviewIndex !== -1) {
            state.review.allReviews.results[updatedReviewIndex] = {
              ...state.review.allReviews.results[updatedReviewIndex],
              feedback: payload.feedback,
              rating: payload.rating,
            };
          }

          state.review.totalRates = payload.totalRates;
        }
      })

      .addCase(reviewthunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reviewthunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      });
  },
});

export default reviewSlice;

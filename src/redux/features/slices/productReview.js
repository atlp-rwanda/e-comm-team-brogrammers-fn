import { createSlice } from '@reduxjs/toolkit';
import reviewthunk from '../actions/productReview';

const initialState = {
  review: [],
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

import { createSlice } from '@reduxjs/toolkit';
import editReviewThunk from '../actions/editReview';

const editReviewSlice = createSlice({
  name: 'aditReview',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(editReviewThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(editReviewThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data;

        state.error = null;
      })
      .addCase(editReviewThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.data = null;
      });
  },
});
export default editReviewSlice;

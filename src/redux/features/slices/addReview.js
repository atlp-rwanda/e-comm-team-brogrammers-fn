import { createSlice } from '@reduxjs/toolkit';
import addReviewThunk from '../actions/giveReview';

const addReviewSlice = createSlice({
  name: 'addReview',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReviewThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(addReviewThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data;

        state.error = null;
      })
      .addCase(addReviewThunk.rejected, (state) => {
        state.isLoading = false;
        state.data = null;
      });
  },
});
export default addReviewSlice.reducer;

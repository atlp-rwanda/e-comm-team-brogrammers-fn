import { createSlice } from '@reduxjs/toolkit';
import deleteReviewThunk from '../actions/deleteReview';

const deleteReviewSlice = createSlice({
  name: 'deleteReview',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteReviewThunk.pending, (state, action) => {
        state[action.meta.arg] = true;
      })
      .addCase(deleteReviewThunk.fulfilled, (state, action) => {
        state[action.meta.arg] = false;
      })
      .addCase(deleteReviewThunk.rejected, (state, action) => {
        state[action.meta.arg] = false;
      });
  },
});

export default deleteReviewSlice.reducer;

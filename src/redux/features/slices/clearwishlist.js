import { createSlice } from '@reduxjs/toolkit';
import ClearWishlistThunk from '../actions/clearwishlist';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
  message: undefined,
};

const clearWishlistSlice = createSlice({
  name: 'clearwishlist',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(ClearWishlistThunk.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.status = 'failed';
          state.error = payload;
        } else {
          state.status = 'succeeded';
          state.message = payload;
          state.data = payload;
        }
      })
      .addCase(ClearWishlistThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ClearWishlistThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export const clearWishList = (state) => state.clearwishlist;
export default clearWishlistSlice;

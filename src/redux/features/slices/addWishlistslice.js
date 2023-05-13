import { createSlice } from '@reduxjs/toolkit';
import AddWishlistThunk from '../actions/addWishlist';

const addToWishlistSlice = createSlice({
  name: 'addWishlist',
  initialState: {
    data: null,
    error: null,
    message: undefined,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddWishlistThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(AddWishlistThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;

        if (payload.error) {
          state.data = null;
        } else {
          state.data = payload.data;
        }
      })
      .addCase(AddWishlistThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.data = null;
      });
  },
});

export default addToWishlistSlice.reducer;

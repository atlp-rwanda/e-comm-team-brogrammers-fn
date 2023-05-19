import { createSlice } from '@reduxjs/toolkit';
import RemoveCartThunk from '../actions/removeCart';

const removeToCartSlice = createSlice({
  name: 'removeToCart',
  initialState: {
    data: null,
    error: false,
    message: undefined,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(RemoveCartThunk.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.data = null;
      })
      .addCase(RemoveCartThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload.message;
        state.error = false;
      })
      .addCase(RemoveCartThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.data = null;
      });
  },
});
export default removeToCartSlice.reducer;

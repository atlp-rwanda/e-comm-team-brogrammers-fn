import { createSlice } from '@reduxjs/toolkit';
import AddCartThunk from '../actions/addCart';

const addToCartSlice = createSlice({
  name: 'addToCart',
  initialState: {
    data: null,
    error: null,
    message: undefined,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddCartThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(AddCartThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.value.data;
        state.message = payload.value.message;
        state.error = null;
      })
      .addCase(AddCartThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.data = null;
      });
  },
});
export default addToCartSlice.reducer;

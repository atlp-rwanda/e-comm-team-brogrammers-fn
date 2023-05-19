/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';
import CartThunk from '../actions/cart';
import RemoveCartThunk from '../actions/removeCart';
import AddCartThunk from '../actions/addCart';
import ClearCartThunk from '../actions/clearCart';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    error: null,
    isLoading: false,
    product: null,
    status: null,
    total: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CartThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CartThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.error) {
          state.error = true;
          state.error = payload?.error?.response?.data?.message || 'error';
        } else {
          state.cart = payload;
          state.error = null;
          state.status = payload.value.data.products.length;
          state.product = payload.value.data.products;
          state.total = payload.value.data.total;
        }
      })
      .addCase(AddCartThunk.fulfilled, (state, { payload }) => {
        state.status = payload.value.data.products.length;
        state.product = payload.value.data.products;
        state.total = payload.value.data.total;
      })
      .addCase(ClearCartThunk.fulfilled, (state) => {
        state.product = [];
        state.status = 0;
        state.total = 0;
      })
      .addCase(RemoveCartThunk.fulfilled, (state, { payload }) => {
        state.total = payload.total;
        state.product = state.product.filter((item) => item.id !== payload.id);
        state.status -= 1;
      })
      .addCase(CartThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default cartSlice.reducer;

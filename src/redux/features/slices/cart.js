import { createSlice } from '@reduxjs/toolkit';
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  getCartItems,
} from '../actions/cart';

const initialState = {
  items: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.status = 'succeeded';
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCart.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      })
      .addCase(removeItemFromCart.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex((item) => item.id === payload.id);
        state.items.splice(index, 1);
        state.status = 'succeeded';
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeItemFromCart.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.status = 'succeeded';
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      })
      .addCase(clearCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(clearCart.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      })
      .addCase(getCartItems.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.status = 'succeeded';
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      })
      .addCase(getCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCartItems.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      });
  },
});

export default cartSlice.reducer;

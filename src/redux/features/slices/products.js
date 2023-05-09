import { createSlice } from '@reduxjs/toolkit';
import fetchProducts from '../actions/products';
import searchThunk from '../actions/search';

const initialState = {
  products: {
    results: [],
    totalPages: undefined,
  },
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.status = 'failed';
          state.error = payload.payload;
        } else {
          state.status = 'succeeded';
          state.products = { ...payload };
        }
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(searchThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(searchThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.products = payload;
      });
  },
});

export default productSlice;

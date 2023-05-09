import { createSlice } from '@reduxjs/toolkit';
import { updateProduct } from '../actions/updateSellerCollection';

const initialState = {
  loading: false,
  error: null,
};

const sellerStatusSlice = createSlice({
  name: 'sellerStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sellerStatusSlice;

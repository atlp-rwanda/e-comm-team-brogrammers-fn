import { createSlice } from '@reduxjs/toolkit';
import { OneProductThunk } from '../actions/product';

const initialState = {
  loading: false,
  error: null,
  selectedProduct: {},
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OneProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(OneProductThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(OneProductThunk.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        selectedProduct: payload,
      }));
  },
});
export const getProduct = (state) => state.product;
export default productSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import ClearCartThunk from '../actions/clearCart';

const ClearCartSlice = createSlice({
  name: 'clearCart',
  initialState: {
    data: null,
    error: false,
    message: undefined,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(ClearCartThunk.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.data = null;
      })
      .addCase(ClearCartThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload.value.message;
        state.error = false;
      })
      .addCase(ClearCartThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.data = null;
      });
  },
});
export default ClearCartSlice.reducer;

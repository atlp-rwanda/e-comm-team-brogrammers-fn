import { createSlice } from '@reduxjs/toolkit';
import DeleteWishlitThunk from '../actions/deleteWishlist';

const DeleteToWishlistSlice = createSlice({
  name: 'deleteTowishlist',
  initialState: {
    data: null,
    error: false,
    message: undefined,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(DeleteWishlitThunk.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.data = null;
      })
      .addCase(DeleteWishlitThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload.message;
        state.error = false;
      })
      .addCase(DeleteWishlitThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.data = null;
      });
  },
});
export default DeleteToWishlistSlice.reducer;

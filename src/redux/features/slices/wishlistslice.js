import { createSlice } from '@reduxjs/toolkit';
import ViewWishlistThunk from '../actions/wishlistaction';
import DeleteWishlitThunk from '../actions/deleteWishlist';
import AddWishlistThunk from '../actions/addWishlist';
import ClearWishlistThunk from '../actions/clearwishlist';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};
const viewWishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ViewWishlistThunk.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.status = 'failed';
          state.error = payload;
        } else {
          state.status = 'succeeded';
          state.data = payload;
        }
      })
      .addCase(ViewWishlistThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ViewWishlistThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(DeleteWishlitThunk.fulfilled, (state, { payload }) => {
        state.data = state.data.filter((item) => item.id !== payload.id);
        state.isLoading = false;
        state.message = payload.message;
        state.error = false;
      })
      .addCase(AddWishlistThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data;
        state.error = null;
      })
      .addCase(ClearWishlistThunk.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.status = 'failed';
          state.error = payload;
        } else {
          state.status = 'succeeded';
          state.message = payload;
          state.data = [];
        }
      });
  },
});
export default viewWishlistSlice;

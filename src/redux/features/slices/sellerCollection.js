import { createSlice } from '@reduxjs/toolkit';
import collectionThunk from '../actions/sellerCollection';

const initialState = {
  collection: [],
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(collectionThunk.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.status = 'failed';
          state.error = payload.payload;
        } else {
          state.status = 'succeeded';
          state.collection = payload;
        }
      })
      .addCase(collectionThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(collectionThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      });
  },
});

export default productSlice;

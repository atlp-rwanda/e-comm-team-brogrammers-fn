import { createSlice } from '@reduxjs/toolkit';
import collectionThunk from '../actions/sellerCollection';
import deleteItemThunk from '../actions/deleteItem';

const initialState = {
  collection: [],
  status: 'idle',
  error: null,
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(collectionThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.collection = payload;
      })

      .addCase(collectionThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(collectionThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      })
      .addCase(deleteItemThunk.fulfilled, (state, { payload }) => {
        if (!payload.error) {
          state.collection.results = state.collection.results.filter(
            (item) => item.id !== payload.item.id
          );
        }
      });
  },
});

export default collectionSlice;

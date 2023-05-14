import { createSlice } from '@reduxjs/toolkit';
import deleteItemThunk from '../actions/deleteItem';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const deleteItemSlice = createSlice({
  name: 'oneProduct',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(deleteItemThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(deleteItemThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      });
  },
});

export default deleteItemSlice;

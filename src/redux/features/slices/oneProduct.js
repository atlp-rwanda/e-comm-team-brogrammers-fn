import { createSlice } from '@reduxjs/toolkit';
import oneProductThunk from '../actions/oneProduct';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const oneProductSlice = createSlice({
  name: 'oneProduct',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(oneProductThunk.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.status = 'failed';
          state.error = payload.payload;
        } else {
          state.status = 'succeeded';
          state.data = payload;
        }
      })
      .addCase(oneProductThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(oneProductThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      });
  },
});

export default oneProductSlice;

import { createSlice } from '@reduxjs/toolkit';
import statusThunk from '../actions/sellerStatus';

const initialState = {
  statis: null,
  status: 'idle',
  error: null,
};

const statusSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(statusThunk.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.status = 'failed';
          state.error = payload.payload;
        } else {
          state.status = 'succeeded';
          state.statis = payload;
        }
      })
      .addCase(statusThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(statusThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      });
  },
});

export default statusSlice;

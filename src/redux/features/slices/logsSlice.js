import { createSlice } from '@reduxjs/toolkit';
import LogsThunk from '../actions/logs';

const initialState = {
  results: [],
  status: 'idle',
  error: null,
};

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LogsThunk.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.status = 'failed';
          state.error = payload;
        } else {
          state.status = 'succeeded';
          state.results = payload;
        }
      })
      .addCase(LogsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LogsThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export default logsSlice.reducer;

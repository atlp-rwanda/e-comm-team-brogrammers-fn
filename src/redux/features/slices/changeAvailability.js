import { createSlice } from '@reduxjs/toolkit';
import availabilityThunk from '../actions/changeAvailability';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const availablitySlice = createSlice({
  name: 'oneProduct',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(availabilityThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(availabilityThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(availabilityThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.payload;
      });
  },
});

export default availablitySlice;

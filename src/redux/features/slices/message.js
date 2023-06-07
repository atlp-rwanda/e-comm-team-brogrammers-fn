import { createSlice } from '@reduxjs/toolkit';
import AddMessageThunk from '../actions/addMessage';

const addMessageSlice = createSlice({
  name: 'addMessage',
  initialState: {
    data: null,
    error: null,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddMessageThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(AddMessageThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload.data;

        state.error = null;
      })
      .addCase(AddMessageThunk.rejected, (state) => {
        state.isLoading = false;
        state.data = null;
      });
  },
});
export default addMessageSlice.reducer;

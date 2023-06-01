import { createSlice } from '@reduxjs/toolkit';
import AddMessageThunk from '../actions/addMessage';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const addMessageSlice = createSlice({
  name: 'addMessage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(AddMessageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(AddMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = null;
      });
  },
});

export default addMessageSlice.reducer;

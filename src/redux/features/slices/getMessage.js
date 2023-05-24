import { createSlice } from '@reduxjs/toolkit';
import MessagesThunk from '../actions/getMessage';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      state.messages = [payload, ...state.messages];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(MessagesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(MessagesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(MessagesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import fetchNotifications from '../actions/notifications';

const initialState = {
  notifications: {
    results: [],
    totalPages: undefined,
  },
  status: 'idle',
  error: null,
  message: undefined,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.status = 'failed';
          state.error = payload.payload;
        } else {
          state.status = 'succeeded';
          state.notifications = { ...payload };
        }
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export default notificationSlice;

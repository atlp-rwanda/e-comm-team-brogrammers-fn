import { createSlice } from '@reduxjs/toolkit';
import LogoutThunk from '../actions/logout';
import LoginThunk from '../actions/login';

const initialState = {
  logout: false,
  loading: false,
  error: false,
  errorMessage: undefined,
};

export const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.fulfilled, (state, { payload }) => {
        if (payload.token) state.logout = false;
      })
      .addCase(LogoutThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(LogoutThunk.rejected, (state, { payload }) => {
        state.error = true;
        state.loading = false;
        state.error = payload.message;
      })
      .addCase(LogoutThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status === 200) {
          state.error = false;
          state.logout = true;
          localStorage.removeItem('token');
        } else if (payload.error) {
          state.error = true;
          state.errorMessage = payload.error?.message;
        }
      });
  },
});

export default logoutSlice.reducer;

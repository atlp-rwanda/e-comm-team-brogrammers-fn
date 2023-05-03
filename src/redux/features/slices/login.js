import { createSlice } from '@reduxjs/toolkit';
import LoginThunk from '../actions/login';
import LogoutThunk from '../actions/logout';

export const initialState = {
  token: localStorage.getItem('token'),
  loading: false,
  error: false,
  errorMessage: undefined,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(LoginThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        if (payload.error.message.toLowerCase() === 'network error')
          state.errorMessage = 'Network Error';
        else
          state.errorMessage =
            payload?.error?.response?.data?.message || 'error';
      })
      .addCase(LoginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        localStorage.setItem('token', payload.token);
        state.error = false;
        state.token = payload.token;
      })
      .addCase(LogoutThunk.fulfilled, (state, { payload }) => {
        if (payload.status === 200) state.token = null;
      });
  },
});
export default loginSlice.reducer;

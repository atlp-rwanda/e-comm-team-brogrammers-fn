import { createSlice } from '@reduxjs/toolkit';
import LoginThunk from '../actions/login';
import LogoutThunk from '../actions/logout';

const initialState = {
  token: localStorage.getItem('token'),
  mfaCode: 0,
  loading: false,
  mfa: false,
  error: false,
  errorMessage: undefined,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, { payload }) {
      localStorage.setItem('token', payload.token);
      state.error = false;
      state.token = payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(LoginThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = { ...payload };
      })
      .addCase(LoginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.error) {
          state.error = true;
          state.errorMessage =
            payload?.error?.response?.data?.message || 'error';
        } else if (payload.token) {
          localStorage.setItem('token', payload.token);
          state.error = false;
          state.token = payload.token;
        } else if (
          typeof payload.message === 'string' &&
          payload.message.includes('check your email')
        ) {
          state.mfa = true;
          state.error = false;
        } else {
          state.error = true;
          state.errorMessage = 'unknown error';
        }
      })
      .addCase(LogoutThunk.fulfilled, (state, { payload }) => {
        if (payload.status === 200) state.token = null;
      });
  },
});
export default loginSlice.reducer;

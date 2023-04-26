import { createSlice } from '@reduxjs/toolkit';
import LoginThunk from '../actions/login';

const initialState = {
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
        state.errorMessage = { ...payload };
      })
      .addCase(LoginThunk.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.error = true;
          state.errorMessage =
            payload?.error?.response?.data?.message || 'error';
        } else if (payload.token) {
          localStorage.setItem('token', payload.token);
          state.error = false;
          state.token = payload.token;
        } else {
          state.error = true;
          state.errorMessage = 'unknown error';
        }
        state.loading = false;
      });
  },
});
export default loginSlice.reducer;

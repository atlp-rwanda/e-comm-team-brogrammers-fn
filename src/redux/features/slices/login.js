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
  extraReducers: {
    [LoginThunk.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [LoginThunk.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = { ...payload };
    },
    [LoginThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = true;
        state.errorMessage = payload?.error?.response?.data?.message || 'error';
      } else if (payload.token) {
        state.error = false;
        state.token = payload.token;
        localStorage.setItem('token', payload.token);
      } else {
        state.error = true;
        state.errorMessage = 'unknown error';
      }
    },
  },
});

// export const { toggle, set } = booleanSlice.actions;

export default loginSlice.reducer;

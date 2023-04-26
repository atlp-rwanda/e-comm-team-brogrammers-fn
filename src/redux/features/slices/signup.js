import { createSlice } from '@reduxjs/toolkit';
import signupThunk from '../actions/signup';

export const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
    errorMessage: undefined,
    successMessage: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.error = null;
        state.successMessage = undefined;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
        if (action.payload.error) {
          state.errorMessage =
            action?.payload?.error?.response?.data?.message || 'error';
        } else {
          state.errorMessage = undefined;
          state.successMessage =
            action.payload.message ||
            'Account created please check your email for verification';
        }
      })
      .addCase(signupThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});
export default signupSlice.reducer;

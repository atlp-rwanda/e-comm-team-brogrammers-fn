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
  extraReducers: (builer) => {
    builer
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
            'Account created please check your email for verification';
        }
      })
      .addCase(signupThunk.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});
export const signupActions = (state) => state.signup.data;
export default signupSlice.reducer;

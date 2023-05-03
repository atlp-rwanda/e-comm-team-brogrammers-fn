/* eslint-disable no-unused-vars */

import { createSlice } from '@reduxjs/toolkit';
import PasswordThunk from '../actions/password';

const initialState = {
  token: localStorage.getItem('token'),
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  isLoading: false,
  error: false,
  errorMessage: undefined,
  successMessage: undefined,
};

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setCurrentPassword: (state, action) => {
      state.currentPassword = action.payload;
    },
    setNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = undefined;
      })
      .addCase(PasswordThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPassword = '';
        state.newPassword = '';
        state.confirmPassword = '';
        state.successMessage =
          action.payload.message || 'Password changed successfully!';
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
          state.token = action.payload.token;
        }
      })
      .addCase(PasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.successMessage = undefined;
        state.errorMessage =
          action.payload.message || 'Failed to change password';
      });
  },
});

export const {
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  setIsLoading,
  setErrorMessage,
  setSuccessMessage,
} = passwordSlice.actions;

export default passwordSlice.reducer;

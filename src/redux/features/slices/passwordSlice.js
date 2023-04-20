/* eslint-disable no-unused-vars */

import { createSlice } from '@reduxjs/toolkit';
import PasswordThunk from '../actions/password';

const initialState = {
  currentPassword: null,
  newPassword: null,
  confirmPassword: null,
  isLoading: false,
  error: false,
  errorMessage: undefined,
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
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PasswordThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPassword = '';
        state.newPassword = '';
        state.confirmPassword = '';
      })
      .addCase(PasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to change password';
      });
  },
});

export const {
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  setIsLoading,
  setError,
} = passwordSlice.actions;

export default passwordSlice.reducer;

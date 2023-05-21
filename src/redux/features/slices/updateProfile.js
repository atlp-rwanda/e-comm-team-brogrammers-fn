import { createSlice } from '@reduxjs/toolkit';
import updateprofileThunk from '../actions/UpdateProfile';

const initialState = {
  loading: false,
  error: '',
  success: false,
};

const updateProfile = createSlice({
  initialState,
  name: 'user/profile',
  reducers: {
    updateDone: (state) => {
      state.success = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateprofileThunk.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = '';
      })
      .addCase(updateprofileThunk.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
        state.error = '';
      })
      .addCase(updateprofileThunk.rejected, (state, { payload }) => {
        state.error = payload?.message ?? 'Unknown error. Check image types.';
        state.loading = false;
        state.success = false;
      });
  },
});

export default updateProfile;

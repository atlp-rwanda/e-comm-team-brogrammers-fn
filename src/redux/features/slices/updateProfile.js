import { createSlice } from '@reduxjs/toolkit';
import updateprofileThunk from '../actions/UpdateProfile';

const initialState = {
  loading: 0,
  error: '',
  success: false,
};

const updateProfile = createSlice({
  initialState,
  name: 'user/profile',

  extraReducers: (builder) => {
    builder
      .addCase(updateprofileThunk.pending, (state) => {
        state.success = false;
        state.loading += 1;
        state.error = '';
      })
      .addCase(updateprofileThunk.fulfilled, (state) => {
        state.success = true;
        state.loading -= 1;
        state.error = '';
        if (state.loading === 0) {
          state.success = false;
          state.error = '';
        }
      })
      .addCase(updateprofileThunk.rejected, (state, { payload }) => {
        state.error = payload?.message ?? 'Unknown error. Check image types.';
        state.loading -= 1;
        state.success = false;
        if (state.loading === 0) {
          state.success = false;
          state.error = '';
        }
      });
  },
});

export default updateProfile;

import { createSlice } from '@reduxjs/toolkit';
import UserThunk from '../actions/user';

const initialState = {
  user: null,
  loading: false,
  error: false,
  errorMessage: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
<<<<<<< HEAD
  extraReducers: (builder) => {
    builder
      .addCase(UserThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(UserThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = { ...payload };
      })
      .addCase(UserThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.error) {
          state.error = true;
          state.errorMessage =
            payload?.error?.response?.data?.message || 'error';
        } else {
          state.error = false;
          state.user = payload;
        }
      });
  },
});

=======
  extraReducers: {
    [UserThunk.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [UserThunk.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = { ...payload };
    },
    [UserThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = true;
        state.errorMessage = payload?.error?.response?.data?.message || 'error';
      } else {
        state.error = false;
        state.user = payload;
      }
    },
  },
});

// export const { toggle, set } = booleanSlice.actions;

>>>>>>> 966b139 (adding header drop-down)
export default userSlice.reducer;

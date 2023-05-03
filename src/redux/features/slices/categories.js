import { createSlice } from '@reduxjs/toolkit';
import categoriesThunk from '../actions/categories';

const initialState = {
  categories: [],
  loading: false,
  error: false,
  errorMessage: undefined,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(categoriesThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.error) {
          state.error = true;
          state.errorMessage =
            payload?.error?.response?.data?.message || 'error';
        } else {
          state.error = false;
          state.categories = payload;
        }
      });
  },
});

export default categoriesSlice.reducer;

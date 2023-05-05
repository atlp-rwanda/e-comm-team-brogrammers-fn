import { createSlice } from '@reduxjs/toolkit';
import addItemThunk from '../actions/additem';

const initialState = {
  item: null,
  loading: false,
  error: {
    status: undefined,
    message: undefined,
    check: false,
  },
};

export const addItemSlice = createSlice({
  name: 'additem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemThunk.pending, (state) => {
        state.loading = true;
        state.error.status = undefined;
        state.error.message = undefined;
        state.error.check = false;
      })
      .addCase(addItemThunk.rejected, (state) => {
        state.loading = false;
        state.error.status = NaN;
        state.error.message = 'error';
        state.error.check = true;
      })
      .addCase(addItemThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.error) {
          state.error.check = true;
          state.error.message =
            payload?.error?.response?.data?.message || 'error';
          state.error.status = payload?.error?.response?.status;
        } else {
          state.error.status = 201;
          state.error.message = undefined;
          state.error.check = false;
          state.item = payload?.product;
        }
      });
  },
});

export default addItemSlice.reducer;

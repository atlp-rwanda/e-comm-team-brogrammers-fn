import { createSlice } from '@reduxjs/toolkit';
import { getSubscribersThunk } from '../actions/subscribe';

const initialState = {
  data: {
    results: [],
    totalPages: undefined,
  },
  loading: false,
  error: {
    isError: undefined,
    message: undefined,
  },
};
const subscribersSlice = createSlice({
  name: 'subscribers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscribersThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error.isError = false;
        state.data = { ...payload.subscribers };
      })
      .addCase(getSubscribersThunk.pending, (state) => {
        state.loading = true;
        state.error.isError = false;
      });
  },
});
export default subscribersSlice;

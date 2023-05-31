import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: null,
  loading: false,
};

const updatesellerStatusSlice = createSlice({
  name: 'updateSellerStatus',
  initialState,
  reducers: {
    updateSellerStatus: (state, action) => {
      state.status = action.payload;
    },
    updatesellerLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { updateSellerStatus, updatesellerLoading } =
  updatesellerStatusSlice.actions;
export default updatesellerStatusSlice.reducer;
//

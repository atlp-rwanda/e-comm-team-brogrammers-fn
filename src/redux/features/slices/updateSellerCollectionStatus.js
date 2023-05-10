import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: null,
};

const updatesellerStatusSlice = createSlice({
  name: 'updatesellerStatus',
  initialState,
  reducers: {
    updateSellerStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { updateSellerStatus } = updatesellerStatusSlice.actions;
export default updatesellerStatusSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

export const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggle, set } = booleanSlice.actions;

export default booleanSlice.reducer;

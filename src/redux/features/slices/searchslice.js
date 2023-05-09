import { createSlice } from '@reduxjs/toolkit';
// import searchThunk from '../actions/search';

const initialState = {
  isLoading: false,
  error: {
    isError: false,
    message: undefined,
  },
  searchForm: {
    q: undefined,
    min: undefined,
    max: undefined,
    category: undefined,
  },
};

export const searchSlice = createSlice({
  name: 'search-product',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchForm = { ...state.searchForm, ...action.payload };
    },
  },
});

export const { setSearchParams } = searchSlice.actions;
export default searchSlice.reducer;

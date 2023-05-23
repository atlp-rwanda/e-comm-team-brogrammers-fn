import { createSlice } from '@reduxjs/toolkit';
import oneOrderThunk, {
  createOrder,
  deleteOrder,
  updateSingleOrder,
} from '../actions/oneOrder';
import ordersThunk from '../actions/orders';

const initialState = {
  allOrders: {
    results: [],
    totalPages: undefined,
  },
  isLoading: false,
  isError: false,
  message: undefined,
  selected: {
    value: null,
    isLoading: false,
    isError: false,
    message: undefined,
    update: {
      isLoading: false,
      isError: false,
      message: undefined,
    },
  },
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetSelected: (state) => {
      state.selected = initialState.selected;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(ordersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ordersThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        if (payload.error.message.toLowerCase() === 'network error')
          state.message = 'Network Error';
        else state.message = payload?.error?.response?.data?.message || 'error';
      })
      .addCase(ordersThunk.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.allOrders.results = [...payload];
      })
      .addCase(oneOrderThunk.pending, (state) => {
        state.selected.isLoading = true;
      })
      .addCase(oneOrderThunk.rejected, (state, { payload }) => {
        state.selected.isLoading = false;
        state.selected.isError = true;
        if (payload.error.message.toLowerCase() === 'network error')
          state.selected.message = 'Network Error';
        else
          state.selected.message =
            payload?.error?.response?.data?.message || 'error';
      })
      .addCase(oneOrderThunk.fulfilled, (state, { payload }) => {
        state.selected.isError = false;
        state.selected.isLoading = false;
        state.selected.value = { ...payload };
      })
      .addCase(updateSingleOrder.pending, (state) => {
        state.selected.update.isLoading = true;
      })
      .addCase(updateSingleOrder.fulfilled, (state, { payload }) => {
        state.selected.value = { ...payload };
        state.selected.update.isError = false;
        state.selected.update.isLoading = false;
      })
      .addCase(updateSingleOrder.rejected, (state, { payload }) => {
        state.selected.update.isError = true;
        if (payload.error.message.toLowerCase() === 'network error')
          state.selected.update.message = 'Network Error';
        else
          state.selected.update.message =
            payload?.error?.response?.data?.message || 'error';
        state.selected.update.isLoading = false;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.allOrders.results.unshift(payload.order);
      })
      .addCase(deleteOrder.fulfilled, (state, { payload }) => {
        state.allOrders.results = state.allOrders.results.filter(
          (item) => item.id !== payload.id
        );
      });
  },
});

export const { resetSelected } = orderSlice.actions;
export default orderSlice.reducer;

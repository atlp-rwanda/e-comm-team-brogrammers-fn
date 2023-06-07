import { createSlice } from '@reduxjs/toolkit';
import oneOrderThunk, {
  updateSingleOrderStatus,
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
    updateOrderStatus: (state, action) => {
      state.allOrders.results = state.allOrders.results.map((order) => {
        if (order.id === action.payload.orders[0].id) {
          return { ...order, ...action.payload.orders[0] };
        }
        return order;
      });
      return state;
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
      })
      .addCase(updateSingleOrderStatus.fulfilled, (state, { payload }) => {
        state.allOrders.results = state.allOrders.results.map((order) => {
          if (order.id === payload.data.id) {
            return { ...order, ...payload.data };
          }
          return order;
        });
      });
  },
});

export const { resetSelected, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;

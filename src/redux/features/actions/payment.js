import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

export const StripePay = createAsyncThunk(
  'payment/stripe',
  async ({ id }, { rejectWithValue }) => {
    try {
      const success = `${window.location.origin}/orders/${id}/payment-success`;
      const fail = `${window.location.href}`;
      const res = await axios.post(
        `/payment/order/${id}`,
        {
          success,
          fail,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export default StripePay;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const ordersThunk = createAsyncThunk(
  'orders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/checkout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export default ordersThunk;

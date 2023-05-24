import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const oneOrderThunk = createAsyncThunk(
  'orders/single',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/checkout/${id}`, {
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

export const updateSingleOrder = createAsyncThunk(
  'order/single/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/checkout/${id}`, data, {
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

export const createOrder = createAsyncThunk(
  'order/create',
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/checkout`, data, {
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
export const deleteOrder = createAsyncThunk(
  'order/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/checkout/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return { ...res.data, id };
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export default oneOrderThunk;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const subscribeThunk = createAsyncThunk(
  'subscribe/add',
  async (data, { rejectWithValue }) => {
    try {
      const redirect = window.location.origin;
      const res = await axios.post('/subscriber', data, {
        headers: {
          success: `${redirect}/subscribe/success`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSubscribersThunk = createAsyncThunk(
  'subscribe/all',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/subscriber/all?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default subscribeThunk;

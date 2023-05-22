import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const fetchNotifications = createAsyncThunk(
  'notifications',
  async (page, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/notification`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      return res.data.allNotifications;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export default fetchNotifications;

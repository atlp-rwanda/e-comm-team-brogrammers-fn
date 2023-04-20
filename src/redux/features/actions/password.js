import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const PasswordThunk = createAsyncThunk(
  'password/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch('/users/change-password', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export default PasswordThunk;

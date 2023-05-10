import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const LoginThunk = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('/users/login', data);
      return res.data;
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export default LoginThunk;

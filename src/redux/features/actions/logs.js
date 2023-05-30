import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const LogsThunk = createAsyncThunk('logs', async () => {
  try {
    const res = await axios.get('/users/logs/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.data.results;
  } catch (error) {
    return { error };
  }
});

export default LogsThunk;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const LogoutThunk = createAsyncThunk('user/logout', async () => {
  try {
    const res = await axios.get('/users/logout', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    await localStorage.removeItem('token');
    return res;
  } catch (error) {
    return { error };
  }
});

export default LogoutThunk;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const UserThunk = createAsyncThunk('user', async () => {
  try {
    const res = await axios.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return res.data;
  } catch (error) {
    return { error };
  }
});

export default UserThunk;

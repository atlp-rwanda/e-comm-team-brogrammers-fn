import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const updateprofileThunk = createAsyncThunk('user/profile', async (data) => {
  try {
    const res = await axios.post('/users/profile', data);
    return res.data;
  } catch (error) {
    return { error };
  }
});

export default updateprofileThunk;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const signupThunk = createAsyncThunk('user/signup', async (data) => {
  try {
    const res = await axios.post('/users/signup', data);
    return res.data;
  } catch (error) {
    return { error };
  }
});

export default signupThunk;

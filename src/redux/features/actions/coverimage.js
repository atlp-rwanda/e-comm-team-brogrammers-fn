import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const updatecoverimageThunk = createAsyncThunk(
  'user/profile/cover-image',
  async (data) => {
    try {
      const res = await axios.post('/users/profile/cover-image', data);
      return res.data;
    } catch (error) {
      return { error };
    }
  }
);

export default updatecoverimageThunk;

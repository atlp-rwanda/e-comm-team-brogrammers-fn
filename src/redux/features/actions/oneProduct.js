import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const oneProductThunk = createAsyncThunk('user/collection', async (id) => {
  try {
    const res = await axios.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    return { error };
  }
});

export default oneProductThunk;

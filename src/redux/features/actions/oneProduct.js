import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const oneProductThunk = createAsyncThunk(
  'user/collection',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default oneProductThunk;

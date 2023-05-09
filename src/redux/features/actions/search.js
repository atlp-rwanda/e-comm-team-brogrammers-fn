import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const searchThunk = createAsyncThunk(
  'products/search',
  async (data, { rejectWithValue }) => {
    try {
      const params = {};

      if (data.category) params.category = data.category;
      if (data.q) params.q = data.q;
      if (data.min) params.min = data.min;
      if (data.max) params.max = data.max;

      const response = await axios.get(`/products/search/query`, {
        params: { ...params, limit: 10, page: data.page },
      });
      return response.data.allproducts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default searchThunk;

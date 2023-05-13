import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const fetchProducts = createAsyncThunk(
  'products',
  async (page, { rejectWithValue }) => {
    try {
      const products = await axios.get(`/products?limit=10&page=${page}`);
      return products.data.allproducts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export default fetchProducts;

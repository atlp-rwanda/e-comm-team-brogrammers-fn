import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchProducts = createAsyncThunk('products', async (page) => {
  try {
    const products = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/products?limit=10&page=${page}`
    );
    return products.data.allproducts;
  } catch (error) {
    return { error };
  }
});
export default fetchProducts;

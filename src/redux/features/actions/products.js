import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchProducts = createAsyncThunk('products', async () => {
  try {
    const products = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/products`
    );
    return products.data.allproducts.results;
  } catch (error) {
    return { error };
  }
});
export default fetchProducts;

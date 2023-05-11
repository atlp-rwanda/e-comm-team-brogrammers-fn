import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const LoginThunk = createAsyncThunk('user/login', async (data) => {
  try {
    const res = await axios.post('/users/login', data);
    return res.data;
  } catch (error) {
    return { error };
  }
});

export const ProductsThunk = createAsyncThunk('products', async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products`);
    return res.data.response.data.allproduct.results;
  } catch (error) {
    return { error };
  }
});

export default LoginThunk;

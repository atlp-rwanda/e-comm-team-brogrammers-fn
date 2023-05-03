import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const categoriesThunk = createAsyncThunk('categories', async () => {
  try {
    const res = await axios.get('/products/categories');
    return res.data;
  } catch (error) {
    return { error };
  }
});

export default categoriesThunk;

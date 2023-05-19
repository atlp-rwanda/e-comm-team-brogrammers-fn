import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const CartThunk = createAsyncThunk('cart', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/cart', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export default CartThunk;

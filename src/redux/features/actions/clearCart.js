import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const ClearCartThunk = createAsyncThunk(
  'clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete('/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export default ClearCartThunk;

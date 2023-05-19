import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const RemoveCartThunk = createAsyncThunk(
  'cart/remove',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return { ...response.data, id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default RemoveCartThunk;

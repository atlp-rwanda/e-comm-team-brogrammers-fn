import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const AddCartThunk = createAsyncThunk(
  'cart/add',
  async ({ id, quantities }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/cart/${id}`,
        { quantities },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export default AddCartThunk;

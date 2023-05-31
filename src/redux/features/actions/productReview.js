import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const reviewthunk = createAsyncThunk(
  'products/reviews',
  async ({ id, page }, { rejectWithValue }) => {
    // Destructure the arguments
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/products/${id}/reviews?limit=5&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default reviewthunk;

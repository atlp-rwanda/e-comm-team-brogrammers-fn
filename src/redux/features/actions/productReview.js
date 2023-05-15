import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const reviewthunk = createAsyncThunk(
  'user/collection',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/products/${id}/reviews`,
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

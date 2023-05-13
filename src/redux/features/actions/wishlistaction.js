import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const ViewWishlistThunk = createAsyncThunk(
  'wishlist',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/wishlist', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export default ViewWishlistThunk;

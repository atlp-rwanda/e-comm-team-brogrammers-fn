import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const ClearWishlistThunk = createAsyncThunk(
  'user/wishlist/clear',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        'wishlist/clear',
        {},
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
export default ClearWishlistThunk;

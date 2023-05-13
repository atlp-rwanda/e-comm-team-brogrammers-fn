import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const AddWishlistThunk = createAsyncThunk(
  'wishlist/add',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/wishlist/${id}`,
        {},
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
export default AddWishlistThunk;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const DeleteWishlitThunk = createAsyncThunk(
  'wishlist/remove',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/wishlist/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return { ...response.data, id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default DeleteWishlitThunk;

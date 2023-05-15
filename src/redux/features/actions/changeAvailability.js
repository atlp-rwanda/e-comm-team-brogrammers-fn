import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const availabilityThunk = createAsyncThunk(
  'user/collection/changeAvailablity',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/products/${id}/available`,
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

export default availabilityThunk;

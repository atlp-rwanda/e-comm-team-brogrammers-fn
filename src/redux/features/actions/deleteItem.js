import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const deleteItemThunk = createAsyncThunk(
  'user/collection/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/products/delete/${id}`,
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

export default deleteItemThunk;

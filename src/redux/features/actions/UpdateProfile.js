import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const updateprofileThunk = createAsyncThunk(
  'user/profile',
  async (
    /** @type {{data: object, action: '' | '/avatar' | '/cover-image'}} */
    { data, action },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(`/users/profile${action}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export default updateprofileThunk;

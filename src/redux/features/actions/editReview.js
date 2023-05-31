import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const editReviewThunk = createAsyncThunk(
  'review/edit',
  async ({ reviewId, feedback, rating }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/reviews/${reviewId}`,
        { feedback, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export default editReviewThunk;

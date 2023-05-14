import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const addReviewThunk = createAsyncThunk(
  'review/add',
  async ({ productId, feedback, rating }) => {
    try {
      const response = await axios.post(
        '/reviews',
        { productId, feedback, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export default addReviewThunk;

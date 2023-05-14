import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const deleteReviewThunk = createAsyncThunk('review/delete', async (id) => {
  try {
    const response = await axios.delete(`/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
});
export default deleteReviewThunk;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const MessagesThunk = createAsyncThunk(
  'chat/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/chat/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.messages;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export default MessagesThunk;

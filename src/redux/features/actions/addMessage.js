import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const AddMessageThunk = createAsyncThunk(
  'chat/addMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await axios.post('/chat/message', message, {
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

export default AddMessageThunk;

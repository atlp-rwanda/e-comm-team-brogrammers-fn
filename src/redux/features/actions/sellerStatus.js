import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const statusThunk = createAsyncThunk('user/collection', async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/stats?20230301`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return { error };
  }
});

export default statusThunk;

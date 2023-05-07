import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const collectionThunk = createAsyncThunk('user/collection', async (page) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/products/collection?limit=10&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return res.data.allProducts;
  } catch (error) {
    return { error };
  }
});

export default collectionThunk;

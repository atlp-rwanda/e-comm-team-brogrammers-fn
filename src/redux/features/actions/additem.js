/* eslint-disable no-restricted-syntax */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

const addItemThunk = createAsyncThunk(
  'products/add',
  async ({ data, images }) => {
    try {
      const form = new FormData();
      for (const [key, value] of Object.entries(data)) {
        form.append(key, value);
      }
      for (const image of images) {
        form.append('images', image);
      }
      const res = await axios.post('/products', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.data;
    } catch (error) {
      return { error };
    }
  }
);

export default addItemThunk;

/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

export const updateProduct = createAsyncThunk(
  'sellerCollection/updateProduct',
  async ({ productId, formData }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/products/${productId}/available`,
        formData
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

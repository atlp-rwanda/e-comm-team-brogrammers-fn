import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../configs/axios';

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async (productId) => {
    try {
      const response = await axios.post(
        `/cart/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return { error };
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItem',
  async (productId) => {
    try {
      const response = await axios.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return { error };
    }
  }
);
export const getCartItems = createAsyncThunk('cart/getItems', async () => {
  try {
    const response = await axios.get('/cart', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return { error };
  }
});
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete('/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

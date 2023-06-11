/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import axios from '../../configs/axios';
import {
  updateSellerStatus,
  updatesellerLoading,
} from '../slices/updateSellerCollectionStatus';

export const updateSellerCollection = (id, formData) => async (dispatch) => {
  try {
    dispatch(updatesellerLoading(true));
    const form = new FormData();
    form.append('name', formData.name);
    form.append('category', formData.category);
    form.append('price', formData.price);
    form.append('quantity', formData.quantity);
    form.append('description', formData.description);
    form.append('expdate', formData.expdate);
    for (const image of formData.images) {
      form.append('images', image);
    }
    const response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/products/${id}`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }
    );
    dispatch(updateSellerStatus(response.message));
  } catch (error) {
    const errorMessage = `Error updating product:${error}`;
    dispatch(updatesellerLoading(errorMessage));
  } finally {
    dispatch(updatesellerLoading(false));
  }
};

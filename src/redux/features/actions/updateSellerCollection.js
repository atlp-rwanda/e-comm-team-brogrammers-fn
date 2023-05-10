/* eslint-disable import/prefer-default-export */
import axios from '../../configs/axios';

import { updateSellerStatus } from '../slices/updateSellerCollectionStatus';

export const updateSellerCollection = (id, formData) => async (dispatch) => {
  try {
    // Send the updated product data to the backend API
    const response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/products/${id}/available`,
      formData
    );
    dispatch(updateSellerStatus(response.data)); // Dispatch an action to update the seller's status
  } catch (error) {
    error('Error updating product:', error);
  }
};

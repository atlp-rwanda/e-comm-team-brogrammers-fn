/* eslint-disable import/prefer-default-export */
import axios from '../../configs/axios';
import {
  updateSellerStatus,
  updatesellerLoading,
} from '../slices/updateSellerCollectionStatus';

export const updateSellerCollection = (id, formData) => async (dispatch) => {
  try {
    dispatch(updatesellerLoading(true));
    // Send the updated product data to the backend API
    const response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/products/${id}`,
      formData
    );
    dispatch(updatesellerLoading(false));

    // console.error(response);
    dispatch(updateSellerStatus(response.data)); // Dispatch an action to update the seller's status
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

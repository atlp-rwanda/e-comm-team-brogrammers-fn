import React from 'react';
import { useDispatch } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';
import AddWishlistThunk from '../redux/features/actions/addWishlist';

function WishlistIcon({ product }) {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const handleAddWishlist = async (id) => {
    try {
      const res = await dispatch(AddWishlistThunk(id)).unwrap();
      showSuccessMessage(res.message);
    } catch (err) {
      showErrorMessage(
        err?.data?.message || 'Oops! This product is already in your wishlist.'
      );
    }
  };
  return (
    <button
      type="button"
      data-testid="wishlist-add"
      onClick={() =>
        isLoggedIn
          ? handleAddWishlist(product.id)
          : showErrorMessage(
              'Please login to add the product to your wishlist.'
            )
      }
    >
      <i className="fa-solid fa-heart" />
    </button>
  );
}

export default WishlistIcon;

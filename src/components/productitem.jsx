import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from './cartIcon';
import AddWishlistThunk from '../redux/features/actions/addWishlist';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';

function ProductItem({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const handleAddWishlist = async (id) => {
    try {
      const res = await dispatch(AddWishlistThunk(id)).unwrap();
      showSuccessMessage(res.message);
    } catch (err) {
      showErrorMessage(
        err?.data?.message || 'Oops! This product is already in your wishlist..'
      );
    }
  };

  return (
    <div
      className="productItem"
      data-testid="product-item"
      aria-hidden
      onDoubleClick={() => navigate(`/oneProduct/${product.id}`)}
    >
      <div className="image back-angular">
        <img
          src={product && product?.images[0]}
          alt="productImage"
          data-testid="image"
        />
      </div>
      <div className="productDes">
        <Link to={`/oneProduct/${product && product?.id}`}>
          <b className="name" alt={product && product?.name}>
            {product && product?.name}
          </b>
        </Link>
        <p className="seller"> {product && product?.seller?.username}</p>
        <div className="price-cart">
          <p>
            <b>${product && product?.price}</b>
          </p>
          {isLoggedIn && (
            <button type="button" onClick={() => handleAddWishlist(product.id)}>
              <i className="fa-solid fa-heart" />
            </button>
          )}
          <CartIcon product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

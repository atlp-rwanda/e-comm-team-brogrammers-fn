import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from './cartIcon';
import { Rwf } from '../helpers/currency';
import WishlistIcon from './wishlistIcon';

function ProductItem({ product }) {
  const navigate = useNavigate();

  const handleImageDoubleClick = () => {
    navigate(`/oneProduct/${product.id}`);
  };

  return (
    <div className="productItem" data-testid="product-item" aria-hidden>
      <div
        className="image back-angular"
        data-testid="image-holder"
        onDoubleClick={handleImageDoubleClick}
      >
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
            <b>{product && Rwf.format(product?.price)}</b>
          </p>
          <div className="buttons">
            <WishlistIcon product={product} />
            <CartIcon product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

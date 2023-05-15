import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from './cartIcon';
import { Rwf } from '../helpers/currency';

function ProductItem({ product }) {
  const navigate = useNavigate();

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
            <b>{product && Rwf.format(product?.price)}</b>
          </p>
          <CartIcon product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

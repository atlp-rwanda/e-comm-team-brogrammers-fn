import React from 'react';
// import productImage from '../images/Frame 17.png';

function ProductItem({ product }) {
  return (
    <div className="productItem">
      <a href={`/oneProduct/${product.id}`}>
        {' '}
        <div className="image">
          <img src={product.images[1]} alt="productImage" />
        </div>
      </a>
      <div className="productDes">
        <p className="name">
          {' '}
          <b>{product.name}</b>
        </p>
        <p className="seller"> {product.seller.username}</p>
        <div className="price-cart">
          <p>
            {' '}
            <b>${product.price}</b>
          </p>
          <i className="fa-solid fa-cart-plus" />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

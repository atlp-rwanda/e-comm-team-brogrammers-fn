/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchProducts from '../redux/features/actions/products';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="product-list">
      {products &&
        Array.isArray(products) &&
        products.map((product) => (
          <div className="productItem">
            <div className="image">
              <img src={product.images[0]} alt="productImage" />
            </div>

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
        ))}
    </div>
  );
}

export default ProductList;

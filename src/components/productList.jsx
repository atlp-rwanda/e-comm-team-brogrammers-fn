/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import './ProductList.css';
import axios from 'axios';

function ProductList({ products }) {
  const [setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:7800/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => error);
  }, []);
  return (
    <>
      {/* <h2>Welcome to BrogrammersMall</h2> */}
      <br />
      <br />
      <br />

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-details">
              <div className="product-price">${product.price.toFixed(2)}</div>
              <div className="sellername"> Seller: {product.seller}</div>
              <div className="product-quantity">
                Available: {product.quantity}
              </div>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;

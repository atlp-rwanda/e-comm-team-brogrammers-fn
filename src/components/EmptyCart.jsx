/* eslint-disable react/button-has-type */
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './EmptyCart.scss';

function EmptyCart() {
  return (
    <div className="empty-cart">
      <AiOutlineShoppingCart className="empty-cart-icon" />
      <h2>Your Cart is Currently Empty</h2>
      <p>
        Before You Proceed To Checkout You Must Add Some Products To Your
        Shopping Cart
      </p>
      <Link to="/products" className="border-button">
        Return To Shop
      </Link>
    </div>
  );
}

export default EmptyCart;

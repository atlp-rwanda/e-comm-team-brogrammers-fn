import React from 'react';
import { Link } from 'react-router-dom';
import css from './style.module.scss';

function EmptyOrders() {
  return (
    <div className={css.emptyList}>
      <h1>No Orders Found</h1>
      <svg className="icon" viewBox="0 0 24 24">
        <path
          fill="#555"
          d="M12 2C6.486 2 2 6.486 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10c0-5.514-4.486-10-10-10zm0 18.5c-4.136 0-7.5-3.364-7.5-7.5S7.864 5.5 12 5.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5zM11 9h2v6h-2zm1 8.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        />
      </svg>
      <p className={css.message}>
        We couldn&#39;t find any orders in your account. Please visit the{' '}
        <Link to="/products">Products Page</Link> to explore our offerings and
        add items to <Link to="/cart">your cart</Link>. Once you have items in
        your cart, you&#39;ll be able to place an order for your desired
        products. If you need any assistance, feel free to contact our customer
        support.
      </p>
    </div>
  );
}

export default EmptyOrders;

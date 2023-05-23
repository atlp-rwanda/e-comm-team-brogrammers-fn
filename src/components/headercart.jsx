/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartThunk from '../redux/features/actions/cart';

function HeaderCart() {
  const { status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CartThunk());
  }, [dispatch]);
  return (
    <div className="header-cart" data-testid="cart-icon">
      <svg
        width="57"
        height="57"
        viewBox="0 0 57 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_41_414)">
          <path
            d="M36.9313 30.875C38.7125 30.875 40.28 29.9013 41.0875 28.4288L49.59 13.015C50.4688 11.4475 49.3288 9.5 47.5238 9.5H12.3738L10.1413 4.75H2.375V9.5H7.125L15.675 27.5263L12.4688 33.3212C10.735 36.5037 13.015 40.375 16.625 40.375H45.125V35.625H16.625L19.2375 30.875H36.9313ZM14.63 14.25H43.4863L36.9313 26.125H20.2588L14.63 14.25ZM16.625 42.75C14.0125 42.75 11.8988 44.8875 11.8988 47.5C11.8988 50.1125 14.0125 52.25 16.625 52.25C19.2375 52.25 21.375 50.1125 21.375 47.5C21.375 44.8875 19.2375 42.75 16.625 42.75ZM40.375 42.75C37.7625 42.75 35.6488 44.8875 35.6488 47.5C35.6488 50.1125 37.7625 52.25 40.375 52.25C42.9875 52.25 45.125 50.1125 45.125 47.5C45.125 44.8875 42.9875 42.75 40.375 42.75Z"
            fill="#DDDDDD"
          />
        </g>
        <defs>
          <clipPath id="clip0_41_414">
            <rect width="57" height="57" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {status ? (
        <div className="number" data-testid="cart-status">
          {status}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default HeaderCart;

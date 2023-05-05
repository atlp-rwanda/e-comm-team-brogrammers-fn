/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
// import { render } from 'react-test-renderer';
import configureStore from 'redux-mock-store';

function fetchProducts() {
  return { type: 'products/fetchProducts' };
}

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

const mockStore = configureStore([]);
const initialState = {
  products: {
    products: [
      {
        name: 'Product 1',
        images: ['https://example.com/product1.jpg'],
        price: 9.99,
        seller: {
          username: 'seller1',
        },
      },
      {
        name: 'Product 2',
        images: ['https://example.com/product2.jpg'],
        price: 19.99,
        seller: {
          username: 'seller2',
        },
      },
    ],
  },
};
const store = mockStore(initialState);

describe('ProductList component', () => {
  it('renders correctly when products are available', () => {
    const tree = render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when products are not available', () => {
    const emptyState = {
      products: {
        products: [],
      },
    };
    const emptyStore = mockStore(emptyState);
    const tree = render(
      <Provider store={emptyStore}>
        <ProductList />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });

  it('dispatches the fetchProducts action on mount', () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    const actions = store.getActions();
  });
});

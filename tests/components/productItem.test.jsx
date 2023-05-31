import React from 'react';
import { afterEach, beforeEach, describe, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { store } from '../../src/redux/store';
import ProductItem from '../../src/components/productitem';

const product = {
  id: 'e0f5d2a9-7bd2-4446-9c46-5453cf7d4080',
  images: [
    'https://loremflickr.com/640/480',
    'https://loremflickr.com/640/480',
    'https://loremflickr.com/640/480',
    'https://loremflickr.com/640/480',
  ],
  name: 'Refined Steel Sausages',
  description:
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
  quantity: 96215,
  exp_date: '2025-02-17T21:01:57.872Z',
  available: true,
  price: 529,
  category: 1,
  createdAt: '2023-05-02T16:36:09.618Z',
  updatedAt: '2023-05-02T16:36:09.618Z',
  seller: {
    username: 'John Doe',
    email: 'john@gmail.com',
  },
};

describe('Testing rendering product', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'damy_token_example');
  });
  afterEach(() => {
    localStorage.removeItem('token');
  });

  test('rendering product Item', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <ProductItem product={product} />
        </BrowserRouter>
      </Provider>
    );

    const item = screen.getByTestId('product-item');
    act(() => {
      fireEvent.doubleClick(item);
    });
  });

  test('rendering product Item with Redux store', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <ProductItem product={product} />
        </BrowserRouter>
      </Provider>
    );

    const itemImage = screen.getByTestId('image-holder');
    act(() => {
      fireEvent.doubleClick(itemImage);
    });
  });
});

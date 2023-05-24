import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { describe, test, expect, afterEach, beforeEach } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import { store } from '../../src/redux/store';
import axios from '../../src/redux/configs/axios';
import WishlistIcon from '../../src/components/wishlistIcon';

const mock = new MockAdapter(axios);

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

const payload = {
  data: {
    id: '5e1d5376-3119-40ff-b6b7-07a3c19fbb67',
    userId: '679e3629-3d33-4841-b6e5-4bf883220603',
    productId: '31d3c22c-d544-44df-bed0-7e09e9ade92b',
    updatedAt: '2023-05-31T20:24:38.257Z',
    createdAt: '2023-05-31T20:24:38.257Z',
  },
  message: 'product added to your wishlist successfully',
};

describe('wishlist', () => {
  afterEach(() => {
    mock.reset();
    localStorage.removeItem('token');
  });
  beforeEach(() => {
    localStorage.setItem('token', 'damy_token_example');
  });

  test('renders wishlist icon button', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WishlistIcon product={product} />
        </MemoryRouter>
      </Provider>
    );

    const wishlistButton = screen.getByTestId('wishlist-add');
    expect(wishlistButton).toBeInTheDocument();
  });

  test('updates quantity state on input change', async () => {
    mock.onPost().reply(200, payload);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WishlistIcon product={product} />
        </MemoryRouter>
      </Provider>
    );

    const wishlistButton = screen.getByTestId('wishlist-add');
    act(() => {
      fireEvent.click(wishlistButton);
    });
  });

  test('updates quantity state on input change', async () => {
    mock.onPost().reply(400, {
      message: 'product already in wishlist',
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WishlistIcon product={product} />
        </MemoryRouter>
      </Provider>
    );

    const wishlistButton = screen.getByTestId('wishlist-add');
    act(() => {
      fireEvent.click(wishlistButton);
    });
  });

  test('updates quantity state on input change', async () => {
    localStorage.removeItem('token');
    mock.onPost().reply(200, payload);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WishlistIcon product={product} />
        </MemoryRouter>
      </Provider>
    );

    const wishlistButton = screen.getByTestId('wishlist-add');
    act(() => {
      fireEvent.click(wishlistButton);
    });
  });
});

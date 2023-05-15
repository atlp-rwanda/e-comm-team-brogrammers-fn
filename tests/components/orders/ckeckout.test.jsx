import { afterEach, describe, expect, test } from '@jest/globals';
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { store } from '../../../src/redux/store';
import Checkout from '../../../src/components/orders/checkout';
import axios from '../../../src/redux/configs/axios';

const mock = new MockAdapter(axios);

const id = 1001;

const successReturn = {
  items: [
    {
      id: '2001',
      images: [
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
      ],
      name: 'Oriental Soft Chips',
      available: true,
      price: 822,
      orderitem: {
        id: '2003',
        quantity: 10,
        productId: '2001',
        orderId: '1001',
        statusUpdated: false,
        expectedDeliveryDate: null,
        price: 822,
      },
    },
    {
      id: '2002',
      images: [
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
      ],
      name: 'shoes',
      available: true,
      price: 100,
      orderitem: {
        id: '3001',
        quantity: 10,
        productId: '2002',
        orderId: '1001',
        statusUpdated: false,
        expectedDeliveryDate: null,
        price: 100,
      },
    },
  ],
  url: 'success.stripe.url',
};

const failReturn = {
  error: {
    message: 'order is already paid',
  },
  url: 'fail.url',
};

describe('testing ckeckout', () => {
  afterEach(() => {
    mock.reset();
  });

  test('should return payment url', () => {
    mock.onAny().reply(200, successReturn);

    render(
      <Provider store={store}>
        <Checkout id={id} />
      </Provider>
    );

    const button = screen.getByTestId('ckeckout-btn');
    expect(button).toBeInTheDocument();
    act(() => {
      fireEvent.click(button);
    });
  });

  test('should be loading', () => {
    mock.onAny().reply(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(200, successReturn);
          }, 5000);
        })
    );

    render(
      <Provider store={store}>
        <Checkout id={id} />
      </Provider>
    );

    const button = screen.getByTestId('ckeckout-btn');
    expect(button).toBeInTheDocument();
    act(() => {
      fireEvent.click(button);
    });

    const loader = screen.getByTestId('ckeckout-loader');
    expect(loader).toBeInTheDocument();
  });

  test('should return network error', () => {
    mock.onAny().networkError();

    render(
      <Provider store={store}>
        <Checkout id={id} />
      </Provider>
    );

    const button = screen.getByTestId('ckeckout-btn');
    expect(button).toBeInTheDocument();
    act(() => {
      fireEvent.click(button);
    });
  });

  test('should return message for paid order', () => {
    mock.onAny().reply(400, failReturn);

    render(
      <Provider store={store}>
        <Checkout id={id} />
      </Provider>
    );

    const button = screen.getByTestId('ckeckout-btn');
    expect(button).toBeInTheDocument();
    act(() => {
      fireEvent.click(button);
    });
  });
});

import { afterEach, describe, test } from '@jest/globals';
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/redux/store';
import axios from '../src/redux/configs/axios';
import GetOrder from '../src/Views/orders/getOne';

const mock = new MockAdapter(axios);

const order = {
  id: '200011',
  deliveryCountry: 'Cameroon',
  deliveryCity: 'Randyberg',
  deliveryStreet: '930 Christian Dam',
  paymentMethod: 'maestro',
  isPaid: false,
  status: 'Pending',
  statusUpdated: false,
  expectedDeliveryDate: '2023-05-02T13:11:37.045Z',
  totalAmount: '48100.69',
  buyerId: '2134521',
  createdAt: '2023-05-02T13:11:37.045Z',
  updatedAt: '2023-05-02T13:11:37.045Z',
  products: [
    {
      id: '10010',
      images: [
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
      ],
      name: 'Oriental Soft Chips',
      available: true,
      price: 822,
      orderitem: {
        id: '20011',
        quantity: 84752,
        productId: '10010',
        orderId: '200011',
        statusUpdated: false,
        expectedDeliveryDate: null,
        price: 32731.16,
      },
    },
    {
      id: '10011',
      images: [
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
      ],
      name: 'Practical Wooden Computer',
      available: true,
      price: 632,
      orderitem: {
        id: '10212',
        quantity: 77502,
        productId: '10011',
        orderId: '200011',
        statusUpdated: false,
        expectedDeliveryDate: null,
        price: 20609.87,
      },
    },
  ],
};

describe('Testing one order', () => {
  afterEach(() => {
    mock.reset();
  });

  test('Should render unpaid order', () => {
    mock.onAny().reply(200, order);
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <GetOrder />
        </BrowserRouter>
      </Provider>
    );
  });

  test('Should render paid order', () => {
    mock.onAny().reply(200, { ...order, isPaid: true });
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <GetOrder />
        </BrowserRouter>
      </Provider>
    );
  });
});

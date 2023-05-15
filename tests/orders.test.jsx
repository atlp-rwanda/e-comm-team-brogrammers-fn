import { afterEach, describe, test } from '@jest/globals';
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/redux/store';
import axios from '../src/redux/configs/axios';
import Orders from '../src/Views/orders';

const mock = new MockAdapter(axios);

const orders = [
  {
    id: 'e6807939-9120-4a76-9220-c6a6e8b49428',
    deliveryCountry: 'Cameroon',
    deliveryCity: 'Randyberg',
    deliveryStreet: '930 Christian Dam',
    paymentMethod: 'maestro',
    isPaid: true,
    status: 'Processing',
    statusUpdated: false,
    expectedDeliveryDate: '2023-05-02T13:11:37.045Z',
    totalAmount: '48100.69',
    buyerId: '5151e5d3-2b8f-4da4-9182-e2262c123e5e',
    createdAt: '2023-05-02T13:11:37.045Z',
    updatedAt: '2023-05-02T13:11:37.045Z',
    products: [
      {
        id: '9c735bc9-54d6-47c8-9c60-b11fe9e3facd',
        images: [
          'https://loremflickr.com/640/480',
          'https://loremflickr.com/640/480',
          'https://loremflickr.com/640/480',
        ],
        name: 'Oriental Soft Chips',
        available: true,
        price: 822,
        orderitem: {
          id: '30e51f26-9435-4adb-b0e8-78bd917808eb',
          quantity: 84752,
          productId: '9c735bc9-54d6-47c8-9c60-b11fe9e3facd',
          orderId: 'e6807939-9120-4a76-9220-c6a6e8b49428',
          statusUpdated: false,
          expectedDeliveryDate: null,
          price: 32731.16,
        },
      },
      {
        id: '0de16390-5314-4c08-aa1d-af3e2866eeaf',
        images: [
          'https://loremflickr.com/640/480',
          'https://loremflickr.com/640/480',
          'https://loremflickr.com/640/480',
        ],
        name: 'Practical Wooden Computer',
        available: true,
        price: 632,
        orderitem: {
          id: '3eff54f6-a426-46c4-a23d-2ab042784e4f',
          quantity: 77502,
          productId: '0de16390-5314-4c08-aa1d-af3e2866eeaf',
          orderId: 'e6807939-9120-4a76-9220-c6a6e8b49428',
          statusUpdated: false,
          expectedDeliveryDate: null,
          price: 20609.87,
        },
      },
    ],
  },
  {
    id: '73407be6-4272-46a8-a7d8-4caf38352b96',
    deliveryCountry: 'Niue',
    deliveryCity: 'San Mateo',
    deliveryStreet: '585 Coy Inlet',
    paymentMethod: 'visa',
    isPaid: true,
    status: 'Shipped',
    statusUpdated: false,
    expectedDeliveryDate: '2023-05-02T13:11:37.046Z',
    totalAmount: '45206.27',
    buyerId: '5151e5d3-2b8f-4da4-9182-e2262c123e5e',
    createdAt: '2023-05-02T13:11:37.046Z',
    updatedAt: '2023-05-02T13:11:37.046Z',
    products: [],
  },
];

describe('Testing orders list', () => {
  afterEach(() => {
    mock.reset();
  });

  test('Should render all orders', () => {
    mock.onAny('/checkout').reply(200, orders);
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Orders />
        </BrowserRouter>
      </Provider>
    );
  });
});

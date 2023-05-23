import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../src/redux/store';
import axios from '../../../src/redux/configs/axios';
import EditOrder from '../../../src/components/orders/editForm';
import { resetSelected } from '../../../src/redux/features/slices/orders';

const mock = new MockAdapter(axios);

const order = {
  id: '1001',
  deliveryCountry: 'Rwanda',
  deliveryCity: 'Kigali',
  deliveryStreet: 'KK 707 Street',
  orderNo: 6426213552,
  paymentMethod: 'card',
  isPaid: false,
  status: 'Pending',
  statusUpdated: false,
  expectedDeliveryDate: null,
  totalAmount: '20350',
  createdAt: '2023-05-18T08:15:29.499Z',
  updatedAt: '2023-05-18T09:26:31.144Z',
  products: [
    {
      id: '20001',
      images: [
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
      ],
      name: 'Luxurious Frozen Car',
      available: true,
      price: 252,
      seller: {
        username: 'Mary Doe',
        email: 'mary@gmail.com',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/414.jpg',
      },
      orderitem: {
        id: '20002',
        quantity: 10,
        productId: '20001',
        orderId: '1001',
        statusUpdated: false,
        expectedDeliveryDate: null,
        price: 252,
      },
    },
    {
      id: '20002',
      images: [
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
        'https://loremflickr.com/640/480',
      ],
      name: 'Licensed Plastic Car',
      available: true,
      price: 516,
      seller: {
        username: 'brogrammer',
        email: 'brogrammer@gmail.com',
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/533.jpg',
      },
      orderitem: {
        id: '20003',
        quantity: 10,
        productId: '20002',
        orderId: '1001',
        statusUpdated: false,
        expectedDeliveryDate: null,
        price: 516,
      },
    },
  ],
};

describe('Testing edit Form Component', () => {
  beforeEach(() => {
    store.dispatch(resetSelected());
  });
  afterEach(() => {
    mock.reset();
  });

  test('Should render the button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <EditOrder order={order} />
        </BrowserRouter>
      </Provider>
    );
    const submit = screen.getByTestId('submit-button');
    const exit = screen.getByTestId('close-button');
    const country = screen.getByPlaceholderText('Delivery country');
    const city = screen.getByPlaceholderText('Delivery city');
    const street = screen.getByPlaceholderText('Delivery street');

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(exit).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(street).toBeInTheDocument();
  });

  test('Should try to open model', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <EditOrder order={order} />
        </BrowserRouter>
      </Provider>
    );
    const open = screen.getByTestId('view-button');
    expect(open).toBeInTheDocument();

    act(() => {
      fireEvent.click(open);
    });
  });

  test('Should try to close model', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <EditOrder order={order} />
        </BrowserRouter>
      </Provider>
    );
    const exit = screen.getByTestId('close-button');
    expect(exit).toBeInTheDocument();

    act(() => {
      fireEvent.click(exit);
    });
  });

  test('Should submit', () => {
    mock.onAny().reply(200, order);

    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <EditOrder order={order} />
        </BrowserRouter>
      </Provider>
    );
    const submit = screen.getByTestId('submit-button');
    const country = screen.getByPlaceholderText('Delivery country');
    const city = screen.getByPlaceholderText('Delivery city');
    const street = screen.getByPlaceholderText('Delivery street');

    act(() => {
      fireEvent.change(country, { target: { value: order.deliveryCountry } });
      fireEvent.change(city, { target: { value: order.deliveryCity } });
      fireEvent.change(street, { target: { value: order.deliveryStreet } });
      fireEvent.click(submit);
    });
  });

  test('Should submit and get network error', () => {
    mock.onAny().networkError();

    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <EditOrder order={order} />
        </BrowserRouter>
      </Provider>
    );
    const submit = screen.getByTestId('submit-button');
    const country = screen.getByPlaceholderText('Delivery country');
    const city = screen.getByPlaceholderText('Delivery city');
    const street = screen.getByPlaceholderText('Delivery street');

    act(() => {
      fireEvent.change(country, { target: { value: order.deliveryCountry } });
      fireEvent.change(city, { target: { value: order.deliveryCity } });
      fireEvent.change(street, { target: { value: order.deliveryStreet } });
      fireEvent.click(submit);
    });
  });

  test('Should submit and get simple error', () => {
    mock.onAny().reply(400, { message: 'bad message' });

    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <EditOrder order={order} />
        </BrowserRouter>
      </Provider>
    );
    const submit = screen.getByTestId('submit-button');
    const country = screen.getByPlaceholderText('Delivery country');
    const city = screen.getByPlaceholderText('Delivery city');
    const street = screen.getByPlaceholderText('Delivery street');

    act(() => {
      fireEvent.change(country, { target: { value: order.deliveryCountry } });
      fireEvent.change(city, { target: { value: order.deliveryCity } });
      fireEvent.change(street, { target: { value: order.deliveryStreet } });
      fireEvent.click(submit);
    });
  });
});

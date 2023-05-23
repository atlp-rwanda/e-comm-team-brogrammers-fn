import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from '@jest/globals';
import React from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../src/redux/store';
import axios from '../../../src/redux/configs/axios';
import CreateOrder from '../../../src/components/orders/create';
import { resetSelected } from '../../../src/redux/features/slices/orders';
import ordersThunk from '../../../src/redux/features/actions/orders';

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

describe('Testing edit Form Component', () => {
  beforeAll(() => {
    mock.onGet('/checkout').reply(200, orders);
    store.dispatch(ordersThunk());
  });
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
          <CreateOrder />
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

  test('Should render the button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CreateOrder />
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
          <CreateOrder />
        </BrowserRouter>
      </Provider>
    );
    const open = screen.getByTestId('checkout-button');
    expect(open).toBeInTheDocument();

    act(() => {
      fireEvent.click(open);
    });
  });

  test('Should try to close model', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CreateOrder />
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
    mock.onPost().reply(200, { order });

    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CreateOrder />
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
    mock.onPost().networkError();

    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CreateOrder />
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
    mock.onPost().reply(400, { message: 'bad message' });

    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CreateOrder />
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

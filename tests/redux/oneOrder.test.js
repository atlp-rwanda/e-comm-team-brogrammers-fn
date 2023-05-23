/* eslint-disable no-promise-executor-return */
import { act } from '@testing-library/react';
import { test, describe, expect, afterEach } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import { store } from '../../src/redux/store';
import axios from '../../src/redux/configs/axios';
import oneOrderThunk, {
  updateSingleOrder,
} from '../../src/redux/features/actions/oneOrder';
import { resetSelected } from '../../src/redux/features/slices/orders';

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

describe('get and update order', () => {
  afterEach(() => {
    mock.reset();
    store.dispatch(resetSelected());
  });

  test('should return one order', async () => {
    mock.onGet().reply(200, order);
    await act(async () => {
      store.dispatch(oneOrderThunk());
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    const { value } = store.getState().orders.selected;
    expect(value).toEqual(order);
  });

  test('should return network error', async () => {
    mock.onGet().networkError();
    await act(async () => {
      store.dispatch(oneOrderThunk());
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    const { message } = store.getState().orders.selected;
    expect(message).toEqual('Network Error');
  });

  test('should update one order', async () => {
    mock.onAny().reply(200, { ...order, deliveryCity: 'Kigali' });
    await act(async () => {
      store.dispatch(
        updateSingleOrder({ id: order.id, data: { deliveryCity: 'Kigali' } })
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    const { value } = store.getState().orders.selected;
    expect(value).toEqual({ ...order, deliveryCity: 'Kigali' });
  });

  test('should return network error', async () => {
    mock.onAny().networkError();
    await act(async () => {
      store.dispatch(
        updateSingleOrder({ id: order.id, data: { deliveryCity: 'Kigali' } })
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    const { message } = store.getState().orders.selected.update;
    expect(message).toEqual('Network Error');
  });
});

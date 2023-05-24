import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/redux/store';
import PaymentSuccessPage, {
  ConfirmationBox,
} from '../src/Views/payments/Success';
import axios from '../src/redux/configs/axios';

const mock = new MockAdapter(axios);
const order = {
  id: '200011',
  deliveryCountry: 'Cameroon',
  deliveryCity: 'Randyberg',
  deliveryStreet: '930 Christian Dam',
  paymentMethod: 'maestro',
  orderNo: 12345,
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

describe('PaymentSuccessPage', () => {
  it('should render the payment success page', async () => {
    mock.onAny().reply(200, order);
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PaymentSuccessPage />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(getByText('Payment Successful')).toBeInTheDocument();
      expect(getByTestId('payment-success-icon')).toBeInTheDocument();
    });
    mock.reset();
  });
});

describe('ConfirmationBox', () => {
  const props = {
    orderNumber: order.orderNo,
    totalCost: order.totalAmount,
    deliveryDate: order.expectedDeliveryDate,
    paymentConfirmation: 'sd-2345678i9o',
  };

  it('testinng success page', () => {
    mock.onAny().reply(200, order);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConfirmationBox {...props} />
        </BrowserRouter>
      </Provider>
    );
  });
});

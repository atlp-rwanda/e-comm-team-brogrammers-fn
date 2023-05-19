import React from 'react';
import { afterEach, beforeAll, describe, expect, it } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import RemoveTrash from '../../src/components/RemoveTrash';
import axios from '../../src/redux/configs/axios';
import CartThunk from '../../src/redux/features/actions/cart';

const mock = new MockAdapter(axios);

describe('RemoveOne', () => {
  beforeAll(() => {
    mock.onGet('/cart').reply(200, {
      value: {
        message: 'Hey Here is your cart!',
        data: {
          id: 'bfe7cf05-8aa9-440e-af3e-d3df6480e69e',
          userId: 'be5ac7a8-429a-4f91-9148-48e75ad2bde1',
          products: [
            {
              id: '4e7f3464-64a9-48cf-b66b-3587ef3dea77',
              name: 'shoes',
              image:
                'http://res.cloudinary.com/du0vsc2pt/image/upload/v1684419447/zhndkxi22qtzokdq9u8r.png',
              price: 90,
              Ptotal: 1530,
              quantity: 17,
            },
          ],
          total: 1530,
          createdAt: '2023-05-18T20:09:58.643Z',
          updatedAt: '2023-05-18T20:15:12.454Z',
        },
      },
    });
    store.dispatch(CartThunk());
  });
  afterEach(() => {
    mock.reset();
  });
  it('should call clear function on button click', async () => {
    mock.onDelete('/cart/4e7f3464-64a9-48cf-b66b-3587ef3dea77').reply(200, {
      id: '4e7f3464-64a9-48cf-b66b-3587ef3dea77',
      message: 'Item removed from cart successfully',
      total: 1400,
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <RemoveTrash p={{ id: '4e7f3464-64a9-48cf-b66b-3587ef3dea77' }} />
      </Provider>
    );

    const addButton = getByTestId('remove-item');
    act(() => {
      fireEvent.click(addButton);
    });
    await waitFor(() => {
      expect(store.getState().cart.product.length).toBe(0);
    });
  });
  it('should call Trash function on button click and handle error response', async () => {
    mock.onDelete().reply(401, {
      statusCode: 401,
      message: 'Please Login',
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <RemoveTrash p={{ p: '' }} />
      </Provider>
    );
    const addButton = getByTestId('remove-item');
    act(() => {
      fireEvent.click(addButton);
    });
  });
});

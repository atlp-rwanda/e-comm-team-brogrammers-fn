import React from 'react';
import { describe, expect, jest, it, beforeAll } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import AddOne from '../../src/components/AddOne';
import axios from '../../src/redux/configs/axios';
import CartThunk from '../../src/redux/features/actions/cart';

const mock = new MockAdapter(axios);

describe('AddOne', () => {
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
  it('should call addByOne function on button click', async () => {
    mock.onPost().reply(200, {
      value: {
        message: 'added to cart successfully',
        data: {
          id: 'b520e8c8-ccbf-456d-acd6-5cab9dd4009b',
          userId: 'be5ac7a8-429a-4f91-9148-48e75ad2bde1',
          products: [
            {
              id: '2f80c1f1-ef26-4d16-afde-85a3ec512c8d',
              name: 'shoes',
              image:
                'http://res.cloudinary.com/du0vsc2pt/image/upload/v1684419304/mylnm1nctvwso3tljsol.png',
              price: 100,
              Ptotal: 1000,
              quantity: '10',
            },
          ],
        },
      },
    });
    const p = { id: 1 };
    const quantities = {};
    const setQuantities = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => [initState, setQuantities]);

    const { getByTestId } = render(
      <Provider store={store}>
        <AddOne p={p} quantities={quantities} setQuantities={setQuantities} />
      </Provider>
    );

    const addButton = getByTestId('increase-quantity');
    act(() => {
      fireEvent.click(addButton);
    });
    await waitFor(() => {
      expect(setQuantities).toHaveBeenCalled();
    });
  });
  it('should call addByOne function on button click and handle error response', async () => {
    mock.onPost().reply(400, {
      error: {
        message: 'not enough product in stock',
      },
    });
    const p = { id: 1 };
    const quantities = {};
    const setQuantities = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => [initState, setQuantities]);

    const { getByTestId } = render(
      <Provider store={store}>
        <AddOne p={p} quantities={quantities} setQuantities={setQuantities} />
      </Provider>
    );

    const addButton = getByTestId('increase-quantity');
    act(() => {
      fireEvent.click(addButton);
    });
  });
});

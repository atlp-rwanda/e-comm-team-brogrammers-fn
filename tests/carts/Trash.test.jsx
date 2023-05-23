import React from 'react';
import { afterEach, describe, expect, it } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import Trash from '../../src/components/Trash';
import axios from '../../src/redux/configs/axios';

const mock = new MockAdapter(axios);

describe('RemoveOne', () => {
  afterEach(() => {
    mock.reset();
  });
  it('should call clear function on button click', async () => {
    mock.onDelete('/cart').reply(200, {
      value: {
        message: 'Cart cleared successfully',
      },
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <Trash />
      </Provider>
    );

    const addButton = getByTestId('remove-all');
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
        <Trash />
      </Provider>
    );
    const addButton = getByTestId('remove-all');
    act(() => {
      fireEvent.click(addButton);
    });
  });
});

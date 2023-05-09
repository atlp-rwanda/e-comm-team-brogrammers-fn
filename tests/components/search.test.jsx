/* eslint-disable no-promise-executor-return */
import React from 'react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import Searchbox from '../../src/components/search';
import { store } from '../../src/redux/store';
import axios from '../../src/redux/configs/axios';
import { setSearchParams } from '../../src/redux/features/slices/searchslice';

const mock = new MockAdapter(axios);
const value = 'shoe';

const users = [
  {
    username: 'user1',
    email: 'user1@example.com',
  },
  {
    username: 'user2',
    email: 'user2@example.com',
  },
];
const products = [
  {
    id: '7739a209-68ff-4526-9fe5-c985dd266a73',
    images: [
      'https://loremflickr.com/640/480',
      'https://loremflickr.com/640/480',
      'https://loremflickr.com/640/480',
    ],
    name: 'Incredible Metal Soap',
    description:
      'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    quantity: 33744,
    exp_date: '2024-08-11T14:47:18.214Z',
    available: true,
    price: 633,
    category: 2,
    createdAt: '2023-05-02T13:11:37.011Z',
    updatedAt: '2023-05-02T13:11:37.011Z',
    seller: { ...users[0] },
  },
  {
    id: '9c735bc9-54d6-47c8-9c60-b11fe9e3facd',
    images: [
      'https://loremflickr.com/640/480',
      'https://loremflickr.com/640/480',
      'https://loremflickr.com/640/480',
    ],
    name: 'Oriental Soft Chips',
    description:
      'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
    quantity: 45896,
    exp_date: '2023-06-30T15:17:33.370Z',
    available: true,
    price: 822,
    category: 2,
    createdAt: '2023-05-02T13:11:37.011Z',
    updatedAt: '2023-05-02T13:11:37.011Z',
    seller: { ...users[1] },
  },
  {
    id: '0fe38a3f-5d1a-4e72-b8b8-f8b490ac8d17',
    images: [
      'http://res.cloudinary.com/dpfueuupz/image/upload/v1683046206/gttfbxg2iepseoyjrrqb.png',
      'http://res.cloudinary.com/dpfueuupz/image/upload/v1683046207/oiijii7rijpcyewatiyt.png',
    ],
    name: 'shoe',
    description: 'new nike shoes',
    quantity: 20,
    exp_date: '2040-03-02T22:00:00.000Z',
    available: true,
    price: 200,
    category: 2,
    createdAt: '2023-05-02T16:50:07.634Z',
    updatedAt: '2023-05-02T16:50:07.634Z',
    seller: { ...users[1] },
  },
  {
    id: '95c680b7-d348-4f35-898e-ae95b78efd1b',
    images: [
      'http://res.cloudinary.com/dpfueuupz/image/upload/v1683048368/mdzqg4yio04opadiuj42.png',
      'http://res.cloudinary.com/dpfueuupz/image/upload/v1683048389/xrqx5ete4raiddx1dm0d.png',
    ],
    name: 'new Car',
    description: 'new description',
    quantity: 100000,
    exp_date: '2023-05-27T22:00:00.000Z',
    available: true,
    price: 123,
    category: 3,
    createdAt: '2023-05-02T17:26:29.694Z',
    updatedAt: '2023-05-02T17:26:29.694Z',
    seller: { ...users[0] },
  },
];

describe('search testing', () => {
  afterEach(() => {
    mock.reset();
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Searchbox />
        </BrowserRouter>
      </Provider>
    );
  });

  test('render', async () => {
    mock.onAny().reply(200, {
      allproducts: {
        next: {
          page: 2,
          limit: 4,
        },
        totalCount: 19,
        totalPages: 5,
        results: [...products],
      },
    });

    const input = screen.getByTestId('search-input');

    act(() => {
      fireEvent.change(input, {
        target: { value },
      });
    });

    const { q } = store.getState().search.searchForm;
    expect(input).toHaveValue(value);
    expect(q).toEqual(value);

    const button = screen.getByTestId('button-search');

    act(async () => {
      fireEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    const {
      error: { isError },
      isLoading,
    } = store.getState().search;

    expect(isLoading).toEqual(false);
    expect(isError).toEqual(false);

    mock.reset();
    mock.onAny().networkError();

    await store.dispatch(
      setSearchParams({ q: value, min: 10, max: 100, category: 'me' })
    );

    act(async () => {
      fireEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });
  });
});

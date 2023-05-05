/* eslint-disable no-promise-executor-return */
import { act } from '@testing-library/react';
import { test, expect, describe, beforeAll, afterEach } from '@jest/globals';
import moment from 'moment';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../src/redux/configs/axios';
import { store } from '../../src/redux/store';
import LoginThunk from '../../src/redux/features/actions/login';
import addItemThunk from '../../src/redux/features/actions/additem';

const testUser = {
  email: 'jean@gmail.com',
  password: '123@Pass',
};
const exp = new Date().setDate(new Date().getDate() + 40);
const product = {
  name: 'new Shoes',
  description: 'new white Shoes',
  category: 1,
  price: 100,
  quantity: 100,
  expdate: moment(exp).format('YYYY-MM-DD'),
  images: [
    new File([new Blob()], 'my_image.png', {
      type: 'image/png',
      lastModified: new Date().getTime(),
    }),
    new File([new Blob()], 'my_image2.png', {
      type: 'image/png',
      lastModified: new Date(moment().subtract(10, 'days')).getTime(),
    }),
  ],
};
const mock = new MockAdapter(axios);

beforeAll(async () => {
  await act(async () => {
    store.dispatch(LoginThunk(testUser));
    await new Promise((resolve) => setTimeout(resolve, 6000));
  });
});
describe('testing additem slice', () => {
  const { images, ...data } = product;
  afterEach(() => {
    mock.reset();
  });

  test('additem wrong', async () => {
    mock.onPost(`/products`).reply(400, {
      message: 'bad request',
      error: 'images must be more than 1',
    });
    await act(async () => {
      store.dispatch(addItemThunk({ data, images: images[0] }));
      await new Promise((resolve) => setTimeout(resolve, 6000));
    });

    const {
      addedItem: { loading, error, item },
    } = store.getState();
    expect(loading).toEqual(false);
    expect(error.check).toEqual(true);
    expect(item).toBeNull();
  });

  test('additem', async () => {
    const {
      addedItem: { item: itemBefore },
    } = store.getState();
    expect(itemBefore).toBeNull();
    mock.onPost(`/products`).reply(201, {
      message: 'product created',
      product: {
        id: 1,
        available: true,
        ...data,
        images: [
          'http://res.cloudinary.com/dpfueuupz/image/upload/v1683046206/gttfbxg2iepseoyjrrqb.png',
          'http://res.cloudinary.com/dpfueuupz/image/upload/v1683046207/oiijii7rijpcyewatiyt.png',
        ],
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });

    await act(async () => {
      store.dispatch(addItemThunk({ data, images }));
      await new Promise((resolve) => setTimeout(resolve, 18000));
    });

    const {
      addedItem: { loading, error, item },
    } = store.getState();
    expect(loading).toEqual(false);
    expect(error.check).toEqual(false);
    expect(item).not.toBeNull();
  });
});

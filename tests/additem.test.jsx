import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  test,
  expect,
  describe,
  beforeEach,
  beforeAll,
  afterEach,
  jest,
} from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import moment from 'moment';
import MockAdapter from 'axios-mock-adapter';
import AddItem from '../src/Views/products/addItem';
import { store } from '../src/redux/store';
import LoginThunk from '../src/redux/features/actions/login';
import UserThunk from '../src/redux/features/actions/user';
import axios from '../src/redux/configs/axios';

const testUser = {
  email: 'jean@gmail.com',
  password: '123@Pass',
};
const buyerUser = {
  email: 'mary@gmail.com',
  password: '123@Pass',
};

const exp = new Date().setDate(new Date().getDate() + 40);
const product = {
  title: 'new Shoes',
  description: 'new white Shoes',
  category: 1,
  price: 100,
  quantity: 100,
  expdate: exp,
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

describe('testing add item not seller', () => {
  let token;
  beforeAll(async () => {
    await act(async () => {
      await store.dispatch(LoginThunk(buyerUser));
      await store.dispatch(UserThunk());
      await new Promise((resolve) => {
        setTimeout(resolve, 7000);
      });
    });
    const {
      login: { token: usertoken },
    } = store.getState();
    token = usertoken;
  });
  test('rendering login', () => {
    localStorage.setItem('token', token);
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <AddItem />
        </BrowserRouter>
      </Provider>
    );
  });
});

describe('testing add item after login', () => {
  let token;
  window.URL.createObjectURL = jest.fn();

  beforeAll(async () => {
    mock.onPost(`/users/login`).reply(200, {
      email: testUser.email,
      token: 'token example',
      message: 'Login Successfully',
    });
    mock.onGet(`/users/profile`).reply(200, {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/684.jpg',
      cover_image: 'https://loremflickr.com/640/480',
      email: testUser.email,
      username: 'sample user',
      role: 'buyer',
      gender: 'none',
    });

    await act(async () => {
      await store.dispatch(LoginThunk(testUser));
      await store.dispatch(UserThunk());
      await new Promise((resolve) => {
        setTimeout(resolve, 7000);
      });
    });
    const {
      login: { token: usertoken },
    } = store.getState();
    token = usertoken;
  });

  beforeEach(async () => {
    mock.onGet(`/products/categories`).reply(200, [
      {
        id: 1,
        title: 'category 1',
      },
      {
        id: 2,
        title: 'category 2',
      },
      {
        id: 3,
        title: 'category 3',
      },
    ]);

    localStorage.setItem('token', token);
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <AddItem />
        </BrowserRouter>
      </Provider>
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  });

  afterEach(() => {
    window.URL.createObjectURL.mockReset();
    mock.reset();
  });

  test('rendering and text images', async () => {
    const fileInput = screen.getByTestId('file-uploader');
    expect(fileInput).toBeInTheDocument();

    await act(async () => {
      Object.defineProperty(fileInput, 'files', {
        value: [product.images[0]],
      });
      fireEvent.change(fileInput);

      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    const remove = screen.getByTestId('remove-image');
    expect(fileInput).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(remove);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });
  });

  test('rendering after login', async () => {
    mock.onPost(`/products`).reply(201, {
      message: 'product created',
      product: {
        id: '1',
        available: true,
        name: product.title,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        exp_date: new Date(product.expdate),
        sellerId: '2',
        category: product.category,
        images: [
          'http://res.cloudinary.com/dpfueuupz/image/upload/v1683099590/ygwuklshrcq7uit5uwdk.png',
          'http://res.cloudinary.com/dpfueuupz/image/upload/v1683099591/fz8pfbwjonmpsyne69qq.png',
        ],
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });

    const form = screen.getByTestId('itemform');
    expect(form).toBeInTheDocument();

    const title = screen.getByPlaceholderText('Title');
    expect(title).toBeInTheDocument();
    const Description = screen.getByTestId('textarea-element');
    expect(Description).toBeInTheDocument();
    const category = screen.getByTestId('select-element');
    expect(category).toBeInTheDocument();
    const price = screen.getByPlaceholderText('Quantity in store');
    expect(price).toBeInTheDocument();
    const quantity = screen.getByPlaceholderText('Price in USD');
    expect(quantity).toBeInTheDocument();
    const expdate = screen.getByPlaceholderText('Expired date');
    expect(expdate).toBeInTheDocument();
    const button = screen.getByText('Add product');
    expect(button).toBeInTheDocument();

    await act(async () => {
      await fireEvent.input(title, { target: { value: product.title } });
      await fireEvent.input(Description, {
        target: { value: product.description },
      });
      await fireEvent.change(category, {
        target: { value: 1 },
      });
      await fireEvent.input(price, { target: { value: product.price } });
      await fireEvent.input(quantity, { target: { value: product.quantity } });
      await fireEvent.input(expdate, {
        target: { value: moment(product.expdate).format('YYYY-MM-DD') },
      });

      await fireEvent.click(button);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    expect(title.value).toEqual(product.title);
    expect(Description.value).toEqual(product.description);
    expect(category.value).toEqual(`${product.category}`);
    expect(price.value).toEqual(`${product.price}`);
    expect(quantity.value).toEqual(`${product.quantity}`);
    expect(expdate.value).toEqual(moment(product.expdate).format('YYYY-MM-DD'));

    const fileInput = screen.getByTestId('file-uploader');
    expect(fileInput).toBeInTheDocument();

    await act(async () => {
      Object.defineProperty(fileInput, 'files', {
        value: [product.images[0], product.images[1]],
      });
      fireEvent.change(fileInput);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    await act(async () => {
      await fireEvent.click(button);

      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });
  });
});

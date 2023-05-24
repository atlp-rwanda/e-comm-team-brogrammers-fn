import { act } from 'react-dom/test-utils';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import {
  expect,
  it,
  describe,
  test,
  beforeAll,
  afterEach,
  beforeEach,
} from '@jest/globals';
import { fireEvent, waitFor } from '@storybook/testing-library';
import '@testing-library/jest-dom';
import SellerCollection from '../src/Views/SellerCollection';
import LoginThunk from '../src/redux/features/actions/login';
import UserThunk from '../src/redux/features/actions/user';
import axios from '../src/redux/configs/axios';
import { store } from '../src/redux/store';
import ProductItem from '../src/components/productitem';

Enzyme.configure({ adapter: new Adapter() });

const buyerUser = {
  email: 'mary@gmail.com',
  password: '123@Pass',
};
const testUser = {
  email: 'mary@gmail.com',
  password: '123@Pass',
  username: 'mary doe',
  avatar:
    'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/684.jpg',
  cover_image: 'https://loremflickr.com/640/480',
  gender: 'male',
  role: 'seller',
};
const mock = new MockAdapter(axios);
describe('SellerCollection', () => {
  let token;
  beforeAll(async () => {
    mock.onPost(`/users/login`).reply(200, {
      email: testUser.email,
      token: 'token example',
      message: 'Login Successfully',
    });
    mock.onGet(`/users/profile`).reply(200, {
      avatar: testUser.avatar,
      cover_image: testUser.cover_image,
      email: testUser.email,
      username: testUser.username,
      role: testUser.role,
      gender: testUser.gender,
    });
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
  afterEach(() => {
    mock.reset();
  });

  beforeEach(() => {
    mock.onGet('/products/collection').reply(200, {
      message: 'All products retrieved successfully',
      allProducts: {
        totalCount: 9,
        totalPages: 1,
        results: [
          {
            id: 'f36e4f85-42bf-41c4-b381-c877d0ff5847',
            images: [
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
            ],
            name: 'Handcrafted Cotton Bike',
            description:
              'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
            quantity: 25321,
            exp_date: '2025-03-28T17:44:28.226Z',
            available: true,
            price: 565,
            category: 1,
            createdAt: '2023-05-02T16:36:09.618Z',
            updatedAt: '2023-05-02T16:36:09.618Z',
            seller: {
              username: 'John Doe',
              email: 'john@gmail.com',
            },
          },
          {
            id: 'e0f5d2a9-7bd2-4446-9c46-5453cf7d4080',
            images: [
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
            ],
            name: 'Refined Steel Sausages',
            description:
              'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
            quantity: 96215,
            exp_date: '2025-02-17T21:01:57.872Z',
            available: true,
            price: 529,
            category: 1,
            createdAt: '2023-05-02T16:36:09.618Z',
            updatedAt: '2023-05-02T16:36:09.618Z',
            seller: {
              username: 'John Doe',
              email: 'john@gmail.com',
            },
          },
        ],
      },
    });
  });
  describe('testing add item not seller', () => {
    test('rendering login', () => {
      localStorage.setItem('token', token);
      render(
        <Provider store={store}>
          <BrowserRouter basename="/">
            <SellerCollection />
          </BrowserRouter>
        </Provider>
      );
    });
  });

  it('should render without errors', () => {
    mount(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <SellerCollection />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should display the seller profile information', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <SellerCollection />
        </BrowserRouter>
      </Provider>
    );

    expect(wrapper.find('.sellerInfo h2').at(0).text()).toEqual(
      testUser.username
    );
    expect(wrapper.find('.sellerInfo p.email').text()).toEqual(testUser.email);
    expect(wrapper.find('.sellerPicture img').prop('src')).toEqual(
      testUser.avatar
    );
    expect(wrapper.find('.sellerStatus p span').at(0).text().trim()).toEqual(
      testUser.gender
    );
  });

  beforeEach(() => {
    mock.onGet('/products/collection').reply(200, {
      message: 'All products retrieved successfully',
      allProducts: {
        totalCount: 9,
        totalPages: 1,
        results: [
          {
            id: 'f36e4f85-42bf-41c4-b381-c877d0ff5847',
            images: [
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
            ],
            name: 'Handcrafted Cotton Bike',
            description:
              'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
            quantity: 25321,
            exp_date: '2025-03-28T17:44:28.226Z',
            available: true,
            price: 565,
            category: 1,
            createdAt: '2023-05-02T16:36:09.618Z',
            updatedAt: '2023-05-02T16:36:09.618Z',
            seller: {
              username: 'John Doe',
              email: 'john@gmail.com',
            },
          },
          {
            id: 'e0f5d2a9-7bd2-4446-9c46-5453cf7d4080',
            images: [
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
            ],
            name: 'Refined Steel Sausages',
            description:
              'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
            quantity: 96215,
            exp_date: '2025-02-17T21:01:57.872Z',
            available: true,
            price: 529,
            category: 1,
            createdAt: '2023-05-02T16:36:09.618Z',
            updatedAt: '2023-05-02T16:36:09.618Z',
            seller: {
              username: 'John Doe',
              email: 'john@gmail.com',
            },
          },
        ],
      },
    });
  });

  test('clicking the next button increments page', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <SellerCollection />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(getByTestId('product')).toBeInTheDocument();
      const nextButton = getByTestId('next-button');
      fireEvent.click(nextButton);
    });
  });

  beforeEach(() => {
    mock.onGet('/products/collection').reply(200, {
      message: 'All products retrieved successfully',
      allProducts: {
        totalCount: 9,
        totalPages: 1,
        results: [
          {
            id: 'f36e4f85-42bf-41c4-b381-c877d0ff5847',
            images: [
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
            ],
            name: 'Handcrafted Cotton Bike',
            description:
              'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
            quantity: 25321,
            exp_date: '2025-03-28T17:44:28.226Z',
            available: true,
            price: 565,
            category: 1,
            createdAt: '2023-05-02T16:36:09.618Z',
            updatedAt: '2023-05-02T16:36:09.618Z',
            seller: {
              username: 'John Doe',
              email: 'john@gmail.com',
            },
          },
          {
            id: 'e0f5d2a9-7bd2-4446-9c46-5453cf7d4080',
            images: [
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
              'https://loremflickr.com/640/480',
            ],
            name: 'Refined Steel Sausages',
            description:
              'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
            quantity: 96215,
            exp_date: '2025-02-17T21:01:57.872Z',
            available: true,
            price: 529,
            category: 1,
            createdAt: '2023-05-02T16:36:09.618Z',
            updatedAt: '2023-05-02T16:36:09.618Z',
            seller: {
              username: 'John Doe',
              email: 'john@gmail.com',
            },
          },
        ],
      },
    });
  });
  test('clicking the back button dispatches the collectionThunk action with the decrements page', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <SellerCollection />
        </BrowserRouter>
      </Provider>
    );

    waitFor(() => {
      expect(getByTestId('product')).toBeInTheDocument();
      const back = getByTestId('back-button');
      fireEvent.click(back);
    });
  });
});

beforeEach(() => {
  mock.onGet('/products/collection').reply(200, {
    message: 'All products retrieved successfully',
    allProducts: {
      totalCount: 9,
      totalPages: 1,
      results: [
        {
          id: 'f36e4f85-42bf-41c4-b381-c877d0ff5847',
          images: [
            'https://loremflickr.com/640/480',
            'https://loremflickr.com/640/480',
            'https://loremflickr.com/640/480',
            'https://loremflickr.com/640/480',
          ],
          name: 'Handcrafted Cotton Bike',
          description:
            'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
          quantity: 25321,
          exp_date: '2025-03-28T17:44:28.226Z',
          available: true,
          price: 565,
          category: 1,
          createdAt: '2023-05-02T16:36:09.618Z',
          updatedAt: '2023-05-02T16:36:09.618Z',
          seller: {
            username: 'John Doe',
            email: 'john@gmail.com',
          },
        },
        {
          id: 'e0f5d2a9-7bd2-4446-9c46-5453cf7d4080',
          images: [
            'https://loremflickr.com/640/480',
            'https://loremflickr.com/640/480',
            'https://loremflickr.com/640/480',
            'https://loremflickr.com/640/480',
          ],
          name: 'Refined Steel Sausages',
          description:
            'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
          quantity: 96215,
          exp_date: '2025-02-17T21:01:57.872Z',
          available: true,
          price: 529,
          category: 1,
          createdAt: '2023-05-02T16:36:09.618Z',
          updatedAt: '2023-05-02T16:36:09.618Z',
          seller: {
            username: 'John Doe',
            email: 'john@gmail.com',
          },
        },
      ],
    },
  });
});

test('clicking page button calls handleCustomPage', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter basename="/">
        <SellerCollection />
      </BrowserRouter>
    </Provider>
  );

  waitFor(() => {
    const back = getByTestId('custom-button');
    fireEvent.click(back);
  });
});

test(' tetsing rendering product Item', () => {
  const product = {
    id: 'e0f5d2a9-7bd2-4446-9c46-5453cf7d4080',
    images: [
      'https://loremflickr.com/640/480',
      'https://loremflickr.com/640/480',
      'https://loremflickr.com/640/480',
      'https://loremflickr.com/640/480',
    ],
    name: 'Refined Steel Sausages',
    description:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    quantity: 96215,
    exp_date: '2025-02-17T21:01:57.872Z',
    available: true,
    price: 529,
    category: 1,
    createdAt: '2023-05-02T16:36:09.618Z',
    updatedAt: '2023-05-02T16:36:09.618Z',
    seller: {
      username: 'John Doe',
      email: 'john@gmail.com',
    },
  };
  waitFor(() => {
    render(<ProductItem product={product} />);
    expect(screen.getAllByTestId('product')).toBeInTheDocument();
  });
});

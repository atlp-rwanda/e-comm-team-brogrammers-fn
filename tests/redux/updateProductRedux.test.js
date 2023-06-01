/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable no-promise-executor-return */
// import { act } from '@testing-library/react';
// import { test, expect, describe, beforeAll, afterEach } from '@jest/globals';
// import moment from 'moment';
// import MockAdapter from 'axios-mock-adapter';
// import axios from '../../src/redux/configs/axios';
// import { store } from '../../src/redux/store';

// import { updateSellerCollection } from '../../src/redux/features/actions/updateSellerCollection';

// const testUser = {
//   email: 'jean@gmail.com',
//   password: '123@Pass',
// };
// const exp = new Date().setDate(new Date().getDate() + 40);
// const product = {
//   name: 'new Shoes',
//   description: 'new white Shoes',
//   category: 1,
//   price: 100,
//   quantity: 100,
//   expdate: moment(exp).format('YYYY-MM-DD'),
//   images: [
//     new File([new Blob()], 'my_image.png', {
//       type: 'image/png',
//       lastModified: new Date().getTime(),
//     }),
//     new File([new Blob()], 'my_image2.png', {
//       type: 'image/png',
//       lastModified: new Date(moment().subtract(10, 'days')).getTime(),
//     }),
//   ],
// };
// const mock = new MockAdapter(axios);

// describe('testing update slice', () => {
//   const { images, ...data } = product;
//   afterEach(() => {
//     mock.reset();
//   });

//   test('update product wrong', async () => {
//     mock.onPatch(`/products/id`).reply(400, {
//       message: 'bad request',
//       error: 'images must be more than 1',
//     });
//     await act(async () => {
//       store.dispatch(updateSellerCollection({ data, images: images[0] }));
//       await new Promise((resolve) => setTimeout(resolve, 6000));
//     });
//   });

//   test('update', async () => {
//     mock.onPatch(`/products/collection/manageProduct`).reply(201, {
//       message: 'product created',
//       product: {
//         id: 1,
//         available: true,
//         ...data,
//         images: [
//           'http://res.cloudinary.com/dpfueuupz/image/upload/v1683046206/gttfbxg2iepseoyjrrqb.png',
//           'http://res.cloudinary.com/dpfueuupz/image/upload/v1683046207/oiijii7rijpcyewatiyt.png',
//         ],
//         updatedAt: new Date(),
//         createdAt: new Date(),
//       },
//     });

//     await act(async () => {
//       store.dispatch(updateSellerCollection({ data, images }));
//       await new Promise((resolve) => setTimeout(resolve, 18000));
//     });
//   });
// });

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from '../../src/redux/configs/axios';
import {
  updatesellerLoading,
  updateSellerStatus,
} from '../../src/redux/features/slices/updateSellerCollectionStatus';

import { updateSellerCollection } from '../../src/redux/features/actions/updateSellerCollection';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock axios if API requests need to be tested
jest.mock('../../src/redux/configs/axios', () => ({
  patch: jest.fn(),
}));

describe('updateSellerCollection actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should dispatch updatesellerLoading(true) and updateSellerStatus(response.message) on successful update', async () => {
    const id = 1;
    const formData = {
      name: 'Product Name',
      category: 'Category',
      price: 10,
      quantity: 5,
      description: 'Product description',
      expdate: '2023-06-30',
      images: [
        /* image files */
      ],
    };

    const response = { message: 'Update successful' };
    axios.patch.mockResolvedValueOnce(response);

    await store.dispatch(updateSellerCollection(id, formData));

    const expectedActions = [
      updatesellerLoading(true),
      updateSellerStatus(response.message),
      updatesellerLoading(false),
    ];

    expect(store.getActions()).toEqual(expectedActions);
    expect(axios.patch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_SERVER_URL}/products/${id}`,
      expect.any(FormData),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }
    );
  });

  test('should dispatch updatesellerLoading with error message on update failure', async () => {
    const id = 1;
    const formData = {
      name: 'Product Name',
      category: 'Category',
      price: 10,
      quantity: 5,
      description: 'Product description',
      expdate: '2023-06-30',
      images: [
        /* image files */
      ],
    };

    const errorMessage = 'Error updating product';
    axios.patch.mockRejectedValueOnce(new Error(errorMessage));

    await store.dispatch(updateSellerCollection(id, formData));

    const expectedActions = [
      updatesellerLoading(true),
      updatesellerLoading(`Error updating product:Error: ${errorMessage}`),
      updatesellerLoading(false),
    ];

    expect(store.getActions()).toEqual(expectedActions);
    expect(axios.patch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_SERVER_URL}/products/${id}`,
      expect.any(FormData),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }
    );
  });
});

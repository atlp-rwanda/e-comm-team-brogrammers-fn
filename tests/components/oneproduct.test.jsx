import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../src/redux/configs/axios';
import OneProduct from '../../src/components/OneProduct';
import addReviewThunk from '../../src/redux/features/actions/giveReview';

import { store } from '../../src/redux/store';

const mockAxios = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);
describe('OneProduct', () => {
  beforeEach(() => {
    mockAxios.onGet().replyOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              201,
              {
                id: 'c25f3de1-0765-4ecc-b8b3-58a28f1a29da',
                images: [
                  'http://res.cloudinary.com/dibojibkz/image/upload/v1685097384/iua63dtg7uossx651l7r.png',
                  'http://res.cloudinary.com/dibojibkz/image/upload/v1685097385/v2z8rzloa3x9y2c4hc3p.png',
                ],
                name: 'Product 1',
                description: 'new shoes on the market',
                quantity: 29,
                exp_date: '2030-03-20T00:00:00.000Z',
                available: true,
                price: 100,
                category: 1,
                createdAt: '2023-05-26T10:36:25.572Z',
                updatedAt: '2023-05-26T10:38:00.619Z',
                seller: {
                  username: 'Jean Doe',
                  email: 'jean@gmail.com',
                },
                reviews: [],
              },
            ]);
          }, 0);
        })
    );
    // store.dispatch(fetchProducts());
    mockAxios.onGet().replyOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              201,
              {
                allReviews: {
                  totalCount: 6,
                  totalPages: 1,
                  results: [
                    {
                      id: 'f8a77186-bfa8-4ee5-8892-31c92ac51761',
                      productId: 'c25f3de1-0765-4ecc-b8b3-58a28f1a29da',
                      userId: '5f33c697-283c-4763-b462-56f6ea619aa1',
                      feedback:
                        'Quasi vitae debitis enim sint aliquam et provident. Ipsam nam maxime deserunt dicta dolorum. Placeat nesciunt alias suscipit ipsa praesentium aut.',
                      rating: 1,
                      createdAt: '2023-05-25T15:14:15.671Z',
                      updatedAt: '2023-05-25T15:14:15.671Z',
                      reviewer: {
                        username: 'Jean Doe',
                        email: 'jean@gmail.com ',
                        avatar:
                          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1085.jpg',
                      },
                    },
                  ],
                },
              },
            ]);
          }, 2000);
        })
    );
    // store.dispatch(reviewthunk());
  });
  it('renders loading spinner when product data is loading', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OneProduct />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('renders product details when product data is available', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OneProduct />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });
  // it('renders the current product image when clicked', () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <OneProduct />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  //   const image1 = screen.getByAltText('picture1');
  //   const image2 = screen.getByAltText('picture2');
  //   image2.click();
  //   expect(image1.src).toContain('image2.jpg');
  // });
  // it('renders the reviewer information and feedback', () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <OneProduct />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  //   expect(screen.getByText('User 1')).toBeInTheDocument();
  //   expect(screen.getByText('4.5')).toBeInTheDocument();
  //   expect(screen.getByText('2023-05-18')).toBeInTheDocument();
  //   expect(screen.getByText('Great product!')).toBeInTheDocument();
  // });
});
describe('addReviewThunk', () => {
  let storee;
  beforeEach(() => {
    storee = mockStore({});
  });
  afterEach(() => {
    mockAxios.reset();
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const productId = 1;
    const feedback = 'Great product!';
    const rating = 5;
    const responseData = { success: true };
    const expectedActions = [
      addReviewThunk.pending.type,
      addReviewThunk.fulfilled.type,
    ];
    mockAxios.onPost('/reviews').reply(200, responseData);
    await storee.dispatch(addReviewThunk({ productId, feedback, rating }));
    const actions = storee.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
  it('should dispatch the correct actions when the request fails', async () => {
    const productId = 1;
    const feedback = 'Great product!';
    const rating = 5;
    const errorMessage = 'Failed to add review';
    const expectedActions = [
      addReviewThunk.pending.type,
      addReviewThunk.rejected.type,
    ];
    mockAxios.onPost('/reviews').reply(500, errorMessage);
    await storee.dispatch(addReviewThunk({ productId, feedback, rating }));
    const actions = storee.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
});

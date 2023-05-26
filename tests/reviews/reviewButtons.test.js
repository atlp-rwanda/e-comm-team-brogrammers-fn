/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { describe, it, beforeAll } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import ReviewButton from '../../src/components/reviewButton';
import axios from '../../src/redux/configs/axios';
import reviewthunk from '../../src/redux/features/actions/productReview';

const mock = new MockAdapter(axios);

describe('RemoveOne', () => {
  beforeAll(() => {
    const id = '5c86de3b-c028-450e-addf-498346a7ff6e';
    mock.onGet(`products/${id}/review`).reply(200, {
      allReviews: {
        totalCount: 7,
        totalPages: 1,
        results: [
          {
            id: '99e81aac-1cc4-46e4-90aa-ddbe53b77c8d',
            productId: '5c86de3b-c028-450e-addf-498346a7ff6e',
            userId: '7d676af1-dfd4-4abd-8177-19561e73b9c5',
            feedback: 'i feel like this product is going to be game changer',
            rating: 4,
            createdAt: '2023-05-18T10:41:45.546Z',
            updatedAt: '2023-05-18T16:44:20.402Z',
            reviewer: {
              username: 'Jean Doe',
              email: 'jean@gmail.com',
              avatar:
                'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1164.jpg',
            },
          },
          {
            id: '421c6eac-8e6a-4fb5-bf08-7b203759fc02',
            productId: '5c86de3b-c028-450e-addf-498346a7ff6e',
            userId: '890c2523-5a7f-49d0-86a0-e23e373443ab',
            feedback:
              'Minus pariatur quam assumenda earum illum officia. Quia itaque consequuntur assumenda quo reiciendis. Nisi consectetur facilis sunt soluta. Quaerat quibusdam quaerat culpa aspernatur earum impedit impedit nobis. Laboriosam numquam at quia.',
            rating: 2,
            createdAt: '2023-05-12T16:54:41.462Z',
            updatedAt: '2023-05-12T16:54:41.462Z',
            reviewer: {
              username: 'Mary Doe',
              email: 'mary@gmail.com',
              avatar:
                'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/10.jpg',
            },
          },
          {
            id: 'caeadff2-abb9-40df-9a7d-4bb1bbd4a3c8',
            productId: '5c86de3b-c028-450e-addf-498346a7ff6e',
            userId: 'd1c7e908-a20d-4ae7-a4dc-c895c030ff5f',
            feedback:
              'Quisquam aut molestiae dolores molestias debitis sapiente consequuntur atque non. Laboriosam voluptatum accusamus incidunt consequatur dolorem labore laudantium cumque. Eum aliquid dignissimos consectetur. Quae autem velit odio eos optio odio sequi repudiandae non.',
            rating: 3,
            createdAt: '2023-05-12T16:54:41.462Z',
            updatedAt: '2023-05-12T16:54:41.462Z',
            reviewer: {
              username: 'John Doe',
              email: 'john@gmail.com',
              avatar:
                'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/464.jpg',
            },
          },
          {
            id: '4f9e1644-c9d6-4b86-8695-d832b20085e5',
            productId: '5c86de3b-c028-450e-addf-498346a7ff6e',
            userId: 'd1c7e908-a20d-4ae7-a4dc-c895c030ff5f',
            feedback:
              'Officia sit eius occaecati nisi. Ab expedita deleniti. Iusto fugit perspiciatis sequi cumque ullam cum dolores aspernatur perferendis. Deleniti animi eligendi.',
            rating: 5,
            createdAt: '2023-05-12T16:54:41.461Z',
            updatedAt: '2023-05-12T16:54:41.461Z',
            reviewer: {
              username: 'John Doe',
              email: 'john@gmail.com',
              avatar:
                'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/464.jpg',
            },
          },
        ],
      },
      totalRates: {
        1: 0,
        2: 1,
        3: 1,
        4: 2,
        5: 3,
        AvRate: 4,
      },
    });
    store.dispatch(reviewthunk());
  });
  it('should call removeOne function on button click', async () => {
    mock.onPost().reply(200, {
      review: {
        id: '99e81aac-1cc4-46e4-90aa-ddbe53b77c8d',
        productId: '5c86de3b-c028-450e-addf-498346a7ff6e',
        userId: '7d676af1-dfd4-4abd-8177-19561e73b9c5',
        feedback: 'i feel like this product is going to be game changer',
        rating: 4,
        createdAt: '2023-05-18T10:41:45.546Z',
        updatedAt: '2023-05-18T16:44:20.402Z',
      },
      totalRates: {
        1: 0,
        2: 1,
        3: 1,
        4: 1,
        5: 3,
        AvRate: 4,
      },
    });
    const reviewer = { id: 1 };

    render(
      <Provider store={store}>
        <ReviewButton reviewer={reviewer} />
      </Provider>
    );
  });
  it('should call removeOne function on button click and handle error response', async () => {
    mock.onPost().reply(400, {
      error: {
        message: 'not enough product in stock',
      },
    });
    const p = { id: 1 };

    const { getByTestId } = render(
      <Provider store={store}>
        <ReviewButton reviewer={p} />
      </Provider>
    );

    const addButton = getByTestId('delete');
    act(() => {
      fireEvent.click(addButton);
    });
  });
});

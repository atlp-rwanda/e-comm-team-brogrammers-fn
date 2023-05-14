import React from 'react';
import {
act,
fireEvent,
render,
screen,
waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from '@jest/globals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import OneProduct from '../../src/components/OneProduct';
import { store } from '../../src/redux/store';
import axios from '../../src/redux/configs/axios';

const mock = new MockAdapter(axios);

const product = {
id: 'd93543a3-43bd-49a6-93b2-2cf3b8a2be42',
images: [
'https://loremflickr.com/640/480',
'https://loremflickr.com/640/480',
'https://loremflickr.com/640/480',
],
name: 'shoes',
description: 'new shoes on the market',
quantity: 20,
exp_date: '2030-03-19T22:00:00.000Z',
available: true,
price: 90,
category: 1,
createdAt: '2023-05-09T18:27:39.810Z',
updatedAt: '2023-05-09T18:27:39.838Z',
seller: {
username: 'user1',
email: 'user1@example.com',
},
};

describe('testing rendering product', () => {
afterEach(() => {
mock.reset();
});

beforeEach(() => {
mock.onAny().reply(200, {
...product,
reviews: [],
});
});

test('rendering product Item', async () => {
render(
<Provider store={store}>
<BrowserRouter basename="/">
<OneProduct />
</BrowserRouter>
</Provider>
);

});
});

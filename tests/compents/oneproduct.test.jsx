import React from 'react';
import { render } from '@testing-library/react';

import { describe, test } from '@jest/globals';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import OneProduct from '../../src/components/OneProduct';
import { store } from '../../src/redux/store';

describe('testing rendering product', () => {
  test('rendering product Item', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <OneProduct />
        </BrowserRouter>
      </Provider>
    );
  });
});

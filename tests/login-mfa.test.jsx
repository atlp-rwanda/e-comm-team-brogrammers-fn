import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { expect, it, describe, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';
import Login from '../src/Views/Login';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Login', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      login: {
        error: false,
        errorMessage: '',
        mfa: true,
        loading: false,
        token: null,
      },
    });
  });

  it('should render the MFA component when the mfa redux state is true', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId('mfa')).toBeInTheDocument();
  });
});

import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  beforeAll,
  afterAll,
  expect,
  it,
  describe,
  beforeEach,
} from '@jest/globals';
import Settings from '../src/components/Settings/Settings';
import '@testing-library/jest-dom';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Settings', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      login: { token: 'token', loading: false },
      user: { loading: false },
    });

    render(
      <Provider store={store}>
        <Settings />
      </Provider>
    );
  });

  it('should render the component', () => {
    const settings = screen.getByTestId('settings-page');
    expect(settings).toBeInTheDocument();
  });

  it('should enable MFA when checkbox is checked', () => {
    const checkbox = screen.getByTestId('mfa');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
  });
});

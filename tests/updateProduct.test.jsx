/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { store } from '../src/redux/store';
import UpdateProductForm from '../src/Views/updateProductForm';
import '@testing-library/jest-dom';

beforeEach(() => {
  render(
    <Provider store={store}>
      <Router>
        <UpdateProductForm />
      </Router>
    </Provider>
  );
});

describe('Create Update Component Rendering', () => {
  test('renders the component', () => {
    render(
      <Provider store={store}>
        <Router>
          <UpdateProductForm />
        </Router>
      </Provider>
    );
  });
  it('renders Update button', () => {
    const btn = screen.getByText('Update');
    expect(btn).toBeInTheDocument();
  });
});

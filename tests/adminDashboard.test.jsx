/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../src/Views/admin/Dash';

jest.mock('axios');

describe('Dashboard component', () => {
  test('should fetch data on initial render', async () => {
    const mockToken = 'mockToken';
    localStorage.setItem('token', mockToken);
    const usersResponse = { data: { totalCount: 5 } };
    const productsResponse = { data: { allproducts: { totalCount: 10 } } };
    const subscribersResponse = { data: { subscribers: [1, 2, 3] } };
    const ordersResponse = { data: { orders: { results: [1, 2, 3] } } };

    axios.get.mockImplementation((url, config) => {
      if (url.includes('/users/all')) {
        expect(config.headers.Authorization).toBe(`Bearer ${mockToken}`);
        return Promise.resolve(usersResponse);
      }
      if (url.includes('/products')) {
        expect(config.headers.Authorization).toBe(`Bearer ${mockToken}`);
        return Promise.resolve(productsResponse);
      }
      if (url.includes('/subscriber/all')) {
        expect(config.headers.Authorization).toBe(`Bearer ${mockToken}`);
        return Promise.resolve(subscribersResponse);
      }
      if (url.includes('/checkout/orders')) {
        expect(config.headers.Authorization).toBe(`Bearer ${mockToken}`);
        return Promise.resolve(ordersResponse);
      }
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(5);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_SERVER_URL}/users/all`,
        {
          headers: { Authorization: `Bearer ${mockToken}` },
        }
      );
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_SERVER_URL}/products`,
        {
          headers: { Authorization: `Bearer ${mockToken}` },
        }
      );
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_SERVER_URL}/subscriber/all`,
        {
          headers: { Authorization: `Bearer ${mockToken}` },
        }
      );
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_SERVER_URL}/checkout/orders`,
        {
          headers: { Authorization: `Bearer ${mockToken}` },
        }
      );
    });
  });
});

describe('Dashboard', () => {
  test('handleYearChange updates the selectedYear state', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    const selectYear = getByTestId('Year');

    fireEvent.change(selectYear, { target: { value: '2023' } });

    await waitFor(() => {
      expect(selectYear.value).toBe('2023');
    });
  });

  test('handleMonthChange updates the selectedMonth state', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    const selectMonth = getByTestId('Month');

    fireEvent.change(selectMonth, { target: { value: '1' } });

    await waitFor(() => {
      expect(selectMonth.value).toBe('1');
    });
  });
});

/* eslint-disable react/jsx-filename-extension */
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import User from '../src/Views/admin/User';

const mock = new MockAdapter(axios);

describe('AdminDashboard', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test_token');
  });

  afterEach(() => {
    localStorage.clear();
    mock.reset();
  });

  it('should render users table', async () => {
    const response = {
      data: {
        results: [
          {
            id: 1,
            username: 'John',
            email: 'john@example.com',
            gender: 'male',
            role: 'seller',
            disabledUser: false,
          },
          {
            id: 2,
            username: 'Jane',
            email: 'jane@example.com',
            gender: 'female',
            role: 'admin',
            disabledUser: true,
          },
        ],
      },
    };
    mock
      .onGet(`${process.env.REACT_APP_SERVER_URL}/users/all`)
      .reply(200, response);

    render(
      <BrowserRouter>
        <User />
      </BrowserRouter>
    );

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });

  it('should render error message if API call fails', async () => {
    const errorResponse = {
      message: 'Error occurred while fetching users',
    };
    mock
      .onGet(`${process.env.REACT_APP_SERVER_URL}/users/all`)
      .reply(500, errorResponse);

    render(
      <BrowserRouter>
        <User />
      </BrowserRouter>
    );

    expect(
      await screen.findByText('Error occurred while fetching users')
    ).toBeInTheDocument();
  });
});

describe('AdminDashboard', () => {
  it('renders a table row for each user with the correct key', () => {
    const users = [
      {
        id: 1,
        username: 'user1',
        email: 'user1@example.com',
        gender: 'male',
        role: 'admin',
        disabledUser: false,
      },
      {
        id: 2,
        username: 'user2',
        email: 'user2@example.com',
        gender: 'female',
        role: 'user',
        disabledUser: true,
      },
    ];
    const { getAllByRole } = render(
      <BrowserRouter>
        <User users={users} />
      </BrowserRouter>
    );
    const rows = getAllByRole('row').slice(1);
    rows.forEach((row, index) => {
      expect(row).toHaveAttribute('key', users[index].id.toString());
    });
  });
});

describe('AdminDashboard', () => {
  it('should toggle the showMenu state when the menu button is clicked', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <User />
      </BrowserRouter>
    );
    const menuButton = getByTestId('menu-button');

    expect(getByTestId('menu-list')).not.toHaveClass('show');
    fireEvent.click(menuButton);
    expect(menuButton).toHaveClass('menu-btn');
    expect(getByTestId('menu-list')).toHaveClass('show');
    fireEvent.click(menuButton);
    expect(menuButton).toHaveClass('menu-btn');
    expect(getByTestId('menu-list')).not.toHaveClass('show');
  });
});

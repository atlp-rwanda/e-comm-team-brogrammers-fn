/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import EditUserForm from '../src/Views/admin/EditUserForm';

jest.mock('axios');

describe('EditUserForm', () => {
  const user = {
    id: 1,
    username: 'testuser',
    email: 'testuser@example.com',
    gender: 'male',
    role: 'buyer',
    verified: true,
    disabledUser: false,
  };

  it('should render the form', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <EditUserForm user={user} />
      </BrowserRouter>
    );

    expect(getByText('Edit User')).toBeInTheDocument();
    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Gender:')).toBeInTheDocument();
    expect(getByLabelText('Role:')).toBeInTheDocument();
    expect(getByLabelText('Verified:')).toBeInTheDocument();
    expect(getByLabelText('Disabled:')).toBeInTheDocument();
  });

  it('should update the user when the form is submitted', async () => {
    const response = { status: 200 };
    axios.patch.mockResolvedValue(response);

    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <EditUserForm user={user} />
      </BrowserRouter>
    );

    fireEvent.change(getByLabelText('Username:'), {
      target: { value: 'newusername' },
    });
    fireEvent.change(getByLabelText('Email:'), {
      target: { value: 'newemail@example.com' },
    });
    fireEvent.change(getByLabelText('Gender:'), {
      target: { value: 'female' },
    });
    fireEvent.change(getByLabelText('Role:'), { target: { value: 'seller' } });
    fireEvent.click(getByText('Update'));

    expect(axios.patch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_SERVER_URL}/users/${user.id}`,
      {
        username: 'newusername',
        email: 'newemail@example.com',
        gender: 'female',
        role: 'seller',
        verified: true,
        disabledUser: false,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );

    await waitFor(() =>
      expect(getByText('User Updated successful')).toBeInTheDocument()
    );
  });
});

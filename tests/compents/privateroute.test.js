/* eslint-disable import/no-duplicates */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import { beforeEach, afterEach, it, expect, describe } from '@jest/globals';
import { Navigate, Outlet } from 'react-router-dom';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import PrivateRoute from '../../src/components/PrivateRoute';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbWJhamVlZWR3aW5AZ21haWwuY29tIiwiaWQiOiI2OTM5NjRhZC1kMWVmLTRlZWEtYTg5ZS00MjZkNzZiODZjZTAiLCJtdXN0VXBkYXRlUGFzc3dvcmQiOnRydWUsImlhdCI6MTY4MjYwMzEyNH0.gzB812AkHM1y5arHccZVxf9oF0gxC73fItQlRE8jxoY';

describe('PrivateRoute', () => {
  beforeEach(() => {
    localStorage.setItem('token', token);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders Outlet when token is present in local storage', () => {
    const wrapper = shallow(<PrivateRoute />);
    expect(wrapper.containsMatchingElement(<Outlet />)).toBe(true);
  });

  it('redirects to login page when no token is present in local storage', () => {
    localStorage.removeItem('token');
    const wrapper = shallow(<PrivateRoute />);
    expect(wrapper.containsMatchingElement(<Navigate to="/login" />)).toBe(
      true
    );
  });
});

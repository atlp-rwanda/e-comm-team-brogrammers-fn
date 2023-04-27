/* eslint-disable react/jsx-filename-extension */
// _ eslint-disable import/no-extraneous-dependencies _/
// _ eslint-disable react/jsx-filename-extension _/
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, describe } from '@jest/globals';
import '@testing-library/jest-dom';
import Input from '../../src/components/input';

describe('testing Input componentt', () => {
  test('renders input element', () => {
    render(<Input />);
    const inputElement = screen.getByTestId('input-element');
    expect(inputElement).not.toBeNull();
    expect(inputElement).toHaveProperty('type', 'text');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders input element', () => {
    render(<Input type="email" />);
    const inputElement = screen.getByTestId('input-element');
    expect(inputElement).not.toBeNull();
    expect(inputElement).toHaveProperty('type', 'email');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders password element', () => {
    render(<Input type="password" />);
    const inputElement = screen.getByTestId('input-element');
    expect(inputElement).not.toBeNull();
    expect(inputElement).toHaveProperty('type', 'password');
    expect(inputElement).toBeInTheDocument();

    const seeButton = screen.getByTestId('see-button');
    expect(seeButton).not.toBeNull();
    expect(seeButton).toBeInTheDocument();

    fireEvent.click(seeButton);
    expect(inputElement).toHaveProperty('type', 'text');

    fireEvent.click(seeButton);
    expect(inputElement).toHaveProperty('type', 'password');
  });

  test('renders error line', () => {
    render(<Input errors="line errors" />);
    const errorLine = screen.getByTestId('errors');
    expect(errorLine).not.toBeNull();
    expect(errorLine).toBeInTheDocument();
    expect(errorLine).toHaveTextContent('line errors');
  });
});

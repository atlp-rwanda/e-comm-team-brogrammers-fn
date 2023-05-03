import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect, describe } from '@jest/globals';
import '@testing-library/jest-dom';
import TextArea from '../../src/components/textarea';

describe('testing Input componentt', () => {
  test('renders input element', () => {
    render(<TextArea />);
    const inputElement = screen.getByTestId('textarea-element');
    expect(inputElement).not.toBeNull();
    expect(inputElement).toBeInTheDocument();
  });

  test('renders input element', () => {
    render(<TextArea resize="horizontal" />);
    const inputElement = screen.getByTestId('textarea-element');
    expect(inputElement).not.toBeNull();
    expect(inputElement).toBeInTheDocument();
  });

  test('renders input element', () => {
    render(<TextArea resize="default" />);
    const inputElement = screen.getByTestId('textarea-element');
    expect(inputElement).not.toBeNull();
    expect(inputElement).toBeInTheDocument();
  });

  test('renders error line', () => {
    render(<TextArea errors="line errors" />);
    const errorLine = screen.getByTestId('errors');
    expect(errorLine).not.toBeNull();
    expect(errorLine).toBeInTheDocument();
    expect(errorLine).toHaveTextContent('line errors');
  });
});

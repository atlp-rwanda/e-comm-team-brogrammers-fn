import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect, describe } from '@jest/globals';
import '@testing-library/jest-dom';
import Select from '../../src/components/select';

describe('testing Input componentt', () => {
  test('renders input element', () => {
    render(
      <Select>
        <option>one</option>
        <option>two</option>
        <option>three</option>
      </Select>
    );
    const inputElement = screen.getByTestId('select-element');
    expect(inputElement).not.toBeNull();
    expect(inputElement).toBeInTheDocument();
  });

  test('renders input element', () => {
    render(<Select options={['one', 'two', 'three']} />);
    const inputElement = screen.getByTestId('select-element');
    expect(inputElement).not.toBeNull();
    expect(inputElement).toBeInTheDocument();
  });

  test('renders error line', () => {
    render(<Select errors="line errors" />);
    const errorLine = screen.getByTestId('errors');
    expect(errorLine).not.toBeNull();
    expect(errorLine).toBeInTheDocument();
    expect(errorLine).toHaveTextContent('line errors');
  });
});

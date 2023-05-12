import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PaginationButtons from '../../src/components/paginationbuttons';

describe('pagination buttons', () => {
  test('render', () => {
    const current = 7;
    const max = 20;
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => [initState, setState]);

    render(
      <PaginationButtons
        currentPage={current}
        setCurrentPage={setState}
        totalPages={max}
      />
    );

    const maxCustom = screen.getByText(`${max - 1}`);
    act(() => {
      fireEvent.click(maxCustom);
    });
    expect(setState).toBeCalled();

    const Random = screen.getByText(`${current - 1}`);
    act(() => {
      fireEvent.click(Random);
    });
    expect(setState).toBeCalled();

    const custom = screen.getByText('2');
    act(() => {
      fireEvent.click(custom);
    });
    expect(setState).toBeCalled();

    const next = screen.getByTestId('next-button');
    act(() => {
      fireEvent.click(next);
    });
    expect(setState).toBeCalled();

    const prev = screen.getByTestId('prev-button');
    act(() => {
      fireEvent.click(prev);
    });
    expect(setState).toBeCalled();
  });

  test('at max', () => {
    const current = 20;
    const max = 20;
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => [initState, setState]);

    render(
      <PaginationButtons
        currentPage={current}
        setCurrentPage={setState}
        totalPages={max}
      />
    );
  });

  test('at min', () => {
    const current = 1;
    const max = 20;
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => [initState, setState]);

    render(
      <PaginationButtons
        currentPage={current}
        setCurrentPage={setState}
        totalPages={max}
      />
    );
  });

  test('at random', () => {
    const current = 5;
    const max = 20;
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => [initState, setState]);

    render(
      <PaginationButtons
        currentPage={current}
        setCurrentPage={setState}
        totalPages={max}
      />
    );
  });
});

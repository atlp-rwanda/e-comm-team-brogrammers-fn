import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, test } from '@jest/globals';
import ProgressBar from '../../src/components/reviewDistribution';

describe('ProgressBar', () => {
  const review = {
    allReviews: {
      results: [{}, {}, {}],
    },
    totalRates: {
      5: 2,
      4: 1,
      3: 0,
      2: 0,
      1: 0,
    },
  };

  it('renders progress bars with correct percentages based on review data', () => {
    const { getByTestId } = render(
      <ProgressBar review={review} status="loaded" />
    );
    // Calculate expected percentages based on the provided review data
    const fiveStarPercentage = (2 / 3) * 100;
    const fourStarPercentage = (1 / 3) * 100;
    const threeStarPercentage = 0;
    const twoStarPercentage = 0;
    const oneStarPercentage = 0;
    // Check if the progress bars render with the correct widths
    expect(getByTestId('progress-bar-5')).toHaveStyle(
      `width: ${fiveStarPercentage}%`
    );
    expect(getByTestId('progress-bar-4')).toHaveStyle(
      `width: ${fourStarPercentage}%`
    );
    expect(getByTestId('progress-bar-3')).toHaveStyle(
      `width: ${threeStarPercentage}%`
    );
    expect(getByTestId('progress-bar-2')).toHaveStyle(
      `width: ${twoStarPercentage}%`
    );
    expect(getByTestId('progress-bar-1')).toHaveStyle(
      `width: ${oneStarPercentage}%`
    );
  });

  test('returns null if there are no reviews', () => {
    const review1 = {
      allReviews: {
        results: [],
      },
    };

    const { container } = render(
      <ProgressBar review={review1} status="loaded" />
    );

    expect(container.firstChild).toBeNull();
  });
});

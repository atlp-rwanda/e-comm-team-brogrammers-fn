import { test } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import StarRating from '../../src/components/starrating';

test('testing star ratings', () => {
  render(<StarRating rate={3.5} />);
});

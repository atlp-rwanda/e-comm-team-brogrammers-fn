import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { expect, it, describe } from '@jest/globals';
import PaymentFailurePage from '../src/Views/payments/Failure';

describe('PaymentFailurePage', () => {
  it('should render the payment failure page', () => {
    const { getByText, getByTestId } = render(<PaymentFailurePage />);
    expect(getByText('Payment Failed')).toBeInTheDocument();
    expect(getByTestId('payment-failure-icon')).toBeInTheDocument();
  });
});

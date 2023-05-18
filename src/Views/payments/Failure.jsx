import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import './PaymentFailure.scss';

function PaymentFailurePage() {
  return (
    <div className="payment-failure-container">
      <div className="payment-failure-icon">
        <FaTimesCircle data-testid="payment-failure-icon" />
      </div>
      <h1 className="payment-failure-text">Payment Failed</h1>
    </div>
  );
}

export default PaymentFailurePage;

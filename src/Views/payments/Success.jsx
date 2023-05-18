import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './PaymentSuccess.scss';

function PaymentSuccessPage() {
  // Example data
  const orderNumber = '123456';
  const totalCost = '$50.00';
  const deliveryDate = 'May 25, 2023';
  const paymentConfirmation = 'Payment ID: 987654321';

  return (
    <div className="payment-success-container">
      <div className="payment-success-icon">
        <FaCheckCircle data-testid="payment-success-icon" />
      </div>
      <h1 className="payment-success-text">Payment Successful</h1>
      <ConfirmationBox
        orderNumber={orderNumber}
        totalCost={totalCost}
        deliveryDate={deliveryDate}
        paymentConfirmation={paymentConfirmation}
      />
    </div>
  );
}

export function ConfirmationBox({
  orderNumber,
  totalCost,
  deliveryDate,
  paymentConfirmation,
}) {
  return (
    <div className="confirmation-box">
      <h3>Payment Information</h3>
      <ul>
        <li>
          Order Number: <span>{orderNumber}</span>
        </li>
        <li>
          Total Cost: <span>{totalCost}</span>
        </li>
        <li>
          Expected Delivery Date: <span>{deliveryDate}</span>
        </li>
        <li>
          Payment Confirmation: <span>{paymentConfirmation}</span>
        </li>
      </ul>
    </div>
  );
}

export default PaymentSuccessPage;

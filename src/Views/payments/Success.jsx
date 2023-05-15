import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import css from './PaymentSuccess.module.scss';
import oneOrderThunk from '../../redux/features/actions/oneOrder';
import { resetSelected } from '../../redux/features/slices/orders';

function PaymentSuccessPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const {
    selected: { value: order, isLoading },
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(oneOrderThunk(id));

    return () => {
      dispatch(resetSelected());
    };
  }, []);

  return isLoading ? (
    <span className="loader-2" />
  ) : (
    <div className={css.payment_success_container}>
      <div className={css.payment_success_icon}>
        <FaCheckCircle data-testid="payment-success-icon" />
      </div>
      <div className={css.confirmation_box}>
        <h1 className={css.payment_success_text}>Payment Successful</h1>
        <ConfirmationBox
          orderNumber={order && order.orderNo}
          totalCost={order && order.totalAmount}
          deliveryDate={
            order && order.expectedDeliveryDate
              ? moment(order.expectedDeliveryDate).format('LL')
              : 'Not Set'
          }
          paymentConfirmation={searchParams.get('paymentID') || 'undefined'}
        />
        <Link to={`/orders/${order && order.id}`}>View order</Link>
      </div>
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
    <div>
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

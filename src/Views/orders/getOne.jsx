import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import css from './style.module.scss';
import oneOrderThunk from '../../redux/features/actions/oneOrder';
import { resetSelected } from '../../redux/features/slices/orders';
import EditOrder from '../../components/orders/editForm';
import Checkout from '../../components/orders/checkout';
import OrderProduct from '../../components/orders/productCard';
import { Rwf } from '../../helpers/currency';
import DeleteOrder from '../../components/orders/delete';

export default function GetOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();
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
    <section className={`${css.container} container`}>
      {/* <div>one {order && order.id}</div> */}
      <div>
        <div className={css.head}>
          <h2>Order No: {order && order.orderNo}</h2>
          <div className={css.dates}>
            <p className="grey">
              Order date: <b>{order && moment(order.createdAt).format('LL')}</b>
            </p>
            {order && order.expectedDeliveryDate && (
              <p className="green">
                Estimated Delivery:{' '}
                <b>
                  {order && moment(order.expectedDeliveryDate).format('LL')}
                </b>
              </p>
            )}
          </div>
        </div>
        <div className={css.sum}>
          <div className={css.summary}>
            <div className={css.title}>
              <h2>
                Amount: <b>{order && Rwf.format(order.totalAmount)}</b>
              </h2>
              <DeleteOrder order={order} />
              {order && !order.isPaid && <Checkout id={order.id} />}
            </div>
            <div>
              <h3>Payment</h3>
              <p>
                <b>status:</b> {order && order.status}
              </p>
              <p>
                <b>Is Paid:</b> {order && order.isPaid ? 'true ' : 'false '}
              </p>
            </div>
            <div>
              <div className={css.title}>
                <h3>Delivery</h3>
                <EditOrder order={order} />
              </div>
              <p>
                <b>Address:</b>{' '}
                {order &&
                  `${order.deliveryStreet}, ${order.deliveryCity}, ${order.deliveryCountry}`}
              </p>
              <p>
                <b>Email:</b> {order && `example@email.com`}
              </p>
            </div>
          </div>
          <div className={css.items}>
            <h3>Ordered Items</h3>
            <div className={css.list}>
              {order?.products &&
                order?.products?.map((item) => (
                  <OrderProduct key={item.id} product={item} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './style.module.scss';
import ordersThunk from '../../redux/features/actions/orders';
import OrderCard from '../../components/orders/orderCard';
import EmptyOrders from './noOrders';

export default function Orders() {
  const dispatch = useDispatch();

  const {
    allOrders: { results: orders },
    isLoading,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!isLoading && (!orders || orders.length === 0)) dispatch(ordersThunk());
  }, []);

  if (isLoading) return <span className="loader-2" />;

  return !orders || orders.length === 0 ? (
    <EmptyOrders />
  ) : (
    <section className={`${css.container} container`}>
      <div className={css.head}>
        <h1>My Orders</h1>
      </div>
      <div className={css.items}>
        <div className={css.list}>
          {orders &&
            orders?.map((order) => <OrderCard key={order.id} order={order} />)}
        </div>
      </div>
    </section>
  );
}

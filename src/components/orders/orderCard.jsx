import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import css from './style.module.scss';
import Checkout from './checkout';
import DeleteOrder from './delete';

export default function OrderCard({ order }) {
  return (
    <div className={css.ordercard}>
      <div>
        <h2>
          Order<Link to={`/orders/${order.id}`}>#{order.orderNo}</Link>
        </h2>
        <Link to={`/orders/${order.id}`}>View Details</Link>
      </div>
      <div>
        <div>
          {order && order.products[0] && (
            <img
              alt="product"
              src={order.products[0]?.images[0]}
              className="back-angular"
            />
          )}
          <div>
            <p>
              {order && order.expectedDeliveryDate ? (
                <>
                  Estimated Delivery:{' '}
                  <b>{moment(order.expectedDeliveryDate).format('LL')}</b>
                </>
              ) : (
                <>
                  Ordered date: <b>{moment(order.createdAt).format('LL')}</b>
                </>
              )}
            </p>
            <p>
              <b>
                {order &&
                  `${order.deliveryStreet}, ${order.deliveryCity}, ${order.deliveryCountry}`}
              </b>
            </p>
          </div>
        </div>
        <DeleteOrder order={order} />
        {!order.isPaid && <Checkout id={order.id} />}
      </div>
    </div>
  );
}

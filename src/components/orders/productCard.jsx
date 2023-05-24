import React from 'react';
import { Link } from 'react-router-dom';
import css from './style.module.scss';
import { Rwf } from '../../helpers/currency';

export default function OrderProduct({ product }) {
  return (
    <div className={css.productCard}>
      <img className="back-angular" alt="item" src={product.images[0]} />
      <div>
        <h3>
          <Link to={`/oneProduct/${product && product?.id}`}>
            {product.name}
          </Link>
        </h3>
        <div>
          <div>
            <p className="grey">{product.seller && product.seller.username}</p>
            <p>
              <b>{Rwf.format(product.price)}</b>
              <span className="grey"> / item</span>
            </p>
          </div>
          <div>
            <p>
              <span className="grey">Ordered items: </span>
              <b>{product.orderitem?.quantity}</b>
            </p>
            <h3>
              <span className="grey">net total: </span>
              <b>
                {Rwf.format(
                  Number(product.orderitem?.price) *
                    Number(product.orderitem?.quantity)
                )}
              </b>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

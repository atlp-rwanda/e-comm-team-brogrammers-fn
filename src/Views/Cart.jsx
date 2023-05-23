import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartThunk from '../redux/features/actions/cart';
import EmptyCart from '../components/EmptyCart';
import AddOne from '../components/AddOne';
import RemoveOne from '../components/RemoveOne';
import Trash from '../components/Trash';
import RemoveTrash from '../components/RemoveTrash';
import { Rwf } from '../helpers/currency';
import CreateOrder from '../components/orders/create';

function Cart() {
  const dispatch = useDispatch();
  const { status, product, total, isLoading } = useSelector(
    (state) => state.cart
  );
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(CartThunk());
  }, []);

  useEffect(() => {
    const newQuantities = {};
    product?.forEach((p) => {
      newQuantities[p.id] = p.quantity;
    });
    setQuantities(newQuantities);
  }, [product, total]);

  if (isLoading) {
    return <div className="loader-2" />;
  }

  return status === 0 ? (
    <EmptyCart />
  ) : (
    <section className="edwin">
      <h2 data-testid="cart-header">
        Your Cart : <b>{status} items</b>
        <Trash />
      </h2>
      <div className="cart-info">
        <div className="cart-list">
          {product?.map((p) => (
            <React.Fragment key={p.id}>
              <div className="cart-item">
                <div className="image">
                  <img src={p.image} alt={p.name} height="100" width="150" />
                </div>

                <div className="info">
                  <div className="product-link">
                    <Link
                      to={`/products/${p.id}`}
                      className="title"
                      data-testid="product-link"
                    >
                      {p.name}
                    </Link>
                    <p className="card_item_price">{Rwf.format(p.price)}</p>
                  </div>

                  <div className="actions">
                    <div className="stockCounter d-inline">
                      <RemoveOne
                        p={p}
                        quantities={quantities}
                        setQuantities={setQuantities}
                      />
                      <span className="form-control count d-inline">
                        {quantities[p.id]}
                      </span>
                      <AddOne
                        p={p}
                        quantities={quantities}
                        setQuantities={setQuantities}
                      />
                    </div>
                    <div className="delete-item">
                      <RemoveTrash p={p} />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="order_summary">
          <h3>Order Summary</h3>
          <div>
            <p>
              Subtotal:
              <span className="order-summary-values">
                {product &&
                  product.reduce(
                    (acc, products) => acc + Number(products.quantity),
                    0
                  )}
                (Units)
              </span>
            </p>
            <p>
              Est. total:
              <span className="order-summary-values">{Rwf.format(total)}</span>
            </p>
            <div className="buttons">
              <CreateOrder />
              <Trash />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;

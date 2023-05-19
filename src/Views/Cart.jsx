/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartThunk from '../redux/features/actions/cart';
import EmptyCart from '../components/EmptyCart';
import AddOne from '../components/AddOne';
import RemoveOne from '../components/RemoveOne';
import Trash from '../components/Trash';
import RemoveTrash from '../components/RemoveTrash';

function Cart() {
  const dispatch = useDispatch();
  const { status, product, total, isLoading } = useSelector(
    (state) => state.cart
  );
  const { isLoading: addToCartLoading } = useSelector(
    (state) => state.addToCart
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
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {status === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <h2 className="mt-5 edwin" data-testid="cart-header">
            Your Cart : <b>{status} items</b>
            <Trash />
          </h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {product?.map((p) => (
                <React.Fragment key={p.product}>
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-3 col-lg-2 edwin">
                        <img
                          src={p.image}
                          alt={p.name}
                          height="100"
                          width="150"
                        />
                      </div>

                      <div
                        className="col-5 col-lg-3"
                        data-testid="product-link"
                      >
                        <Link
                          to={`/products/${p.id}`}
                          data-testid="product-link"
                        >
                          {p.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${p.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <RemoveOne
                            p={p}
                            quantities={quantities}
                            setQuantities={setQuantities}
                          />
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={quantities[p.id]}
                            readOnly
                          />
                          <AddOne
                            p={p}
                            quantities={quantities}
                            setQuantities={setQuantities}
                          />
                        </div>
                      </div>

                      <div className="col-3 col-lg-2 mt-3 mt-lg-0">
                        <RemoveTrash p={p} />
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-6">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
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
                  <span className="order-summary-values">${total}</span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  data-testid="checkout-button"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddCartThunk from '../redux/features/actions/addCart';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';
import { Rwf } from '../helpers/currency';

function CartIcon({ product }) {
  const dialog = useRef();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.addToCart);
  const {
    user: { user },
  } = useSelector((state) => state);

  const closeModel = () => {
    if (typeof dialog.current.close === 'function') dialog.current.close();
  };

  const openModel = () => {
    if (typeof dialog.current.showModal === 'function')
      dialog.current.showModal();
  };

  const addToCartHandler = async (event, id, quantities) => {
    try {
      event.preventDefault();
      const response = await dispatch(
        AddCartThunk({ id, quantities })
      ).unwrap();
      showSuccessMessage(response.value.message);
      closeModel();
    } catch (error) {
      showErrorMessage(error || 'Something went wrong');
    }
  };

  const closeDialog = (e) => {
    const dialogDimensions = dialog.current?.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.current.close();
    }
  };

  useEffect(() => {
    dialog.current?.addEventListener('click', closeDialog);
    return () => {
      dialog.current?.removeEventListener('click', closeDialog);
    };
  }, []);

  return (
    <>
      <dialog
        ref={dialog}
        className="add-cart-dialog"
        data-testid="add-cart-dialog"
      >
        <div>
          <h3>
            Comfirm to add:{' '}
            <Link to={`/oneProduct/${product?.id}`}>{product?.name}</Link>
          </h3>
          <form>
            <p>
              <span>Product Name:</span>
              <b data-testid="product-name">
                <Link to={`/oneProduct/${product?.id}`}>{product?.name}</Link>
              </b>
            </p>
            <label htmlFor="number">
              <span>Quantity</span>
              <input
                id="number"
                type="number"
                min={1}
                defaultValue={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />
              <span className="grey" data-testid="product-quantity">
                / {product?.quantity} items
              </span>
            </label>
            <p>
              <span>Price</span>
              <b data-testid="product-price">
                {Rwf.format((product?.price || 0) * quantity)}
              </b>
            </p>
            <div>
              <button
                type="submit"
                className="btn1"
                disabled={isLoading}
                onClick={(e) => addToCartHandler(e, product?.id, quantity)}
                data-testid="confirm-button"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <button
        type="button"
        onClick={() =>
          user
            ? openModel()
            : showErrorMessage('Please login to add the product to your cart.')
        }
        data-testid="cart-button"
      >
        <i className="fa-solid fa-cart-plus" />
      </button>
    </>
  );
}
export default CartIcon;

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function CartIcon({ product }) {
  const dialog = useRef();
  const [quantity, setQuantity] = useState(1);

  const close = (e) => {
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
    dialog.current?.addEventListener('click', close);
    return () => {
      dialog.current?.removeEventListener('click', close);
    };
  }, [dialog, dialog.current]);

  return (
    <>
      <dialog ref={dialog} className="add-cart-dialog">
        <div>
          <h3>
            Comfirm to add:{' '}
            <Link to={`/oneProduct/${product && product.id}`}>
              {product && product.name}
            </Link>
          </h3>
          <form>
            <p>
              <span>Product Name:</span>
              <b>
                <Link to={`/oneProduct/${product && product.id}`}>
                  {product && product.name}
                </Link>
              </b>
            </p>
            <label htmlFor="number">
              <span>Quantity</span>
              <input
                id="number"
                type="number"
                min={1}
                max={product && product.quantity}
                defaultValue={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />
              <span className="grey">
                / {product && product.quantity} items
              </span>
            </label>
            <p>
              <span>Price</span>
              <b>${(product && product.price) * quantity}</b>
            </p>
            <div>
              <button formMethod="dialog" type="submit" className="btn1 cancel">
                Cancel
              </button>
              <button type="submit" className="btn1">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <button type="button" onClick={() => dialog.current.showModal()}>
        <i className="fa-solid fa-cart-plus" />
      </button>
    </>
  );
}

export default CartIcon;

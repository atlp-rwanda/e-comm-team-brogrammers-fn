import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteItemThunk from '../redux/features/actions/deleteItem';
import availabilityThunk from '../redux/features/actions/changeAvailability';
import { showSuccessMessage } from '../utils/toast';

function ManageItem({ product }) {
  const dispatch = useDispatch();
  const [disAbled, setDisabled] = useState(product.available);
  const { status } = useSelector((state) => state.deleteItem);

  const handleDelete = (id) => {
    dispatch(deleteItemThunk(id)).then(() => {
      showSuccessMessage('product deleted successfuly');
    });
  };
  const { status: loading } = useSelector((state) => state.availablity);

  const handleAvailable = (id) => {
    dispatch(availabilityThunk(id)).then(() => {
      setDisabled(!disAbled);
      showSuccessMessage('availability changed');
    });
  };

  const desc = product.description;
  const datec = product.updatedAt;
  const datex = product.exp_date;

  return (
    <div className="productItem2">
      <a data-testid="oneProductLInk" href={`/oneProduct/${product.id}`}>
        {' '}
        <div className="image">
          <img src={product.images[1]} alt="productImage" />
        </div>
      </a>
      <div className="desc">
        <p className="prodName">
          {' '}
          <b>{product.name}</b>
        </p>

        <p className="desc"> {desc.slice(0, 50)}</p>
        <p className="date">
          <span>Created At:</span>
          {datec.slice(0, 10)}
        </p>
        <p className="date">
          <span>Expire At:</span>
          {datex.slice(0, 10)}
        </p>
      </div>

      <div className="manageFontas">
        <div className="dropdown">
          <button
            type="button"
            className="dropbtn"
            onClick={(e) =>
              e.currentTarget.nextSibling.classList.toggle('show')
            }
          >
            <i className="fa fa-ellipsis-v" />
          </button>

          <div className="dropdown-content">
            <button
              type="button"
              onClick={() => handleDelete(product.id)}
              className="btn"
            >
              {status === 'loading' ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                <p>delete</p>
              )}
            </button>
            <button type="button" className="btn">
              edit
            </button>
            {disAbled ? (
              <button
                type="button"
                className="btn"
                onClick={() => handleAvailable(product.id)}
              >
                {loading === 'loading' ? (
                  <i className="fa fa-spinner fa-spin" />
                ) : (
                  <p>Disable</p>
                )}
              </button>
            ) : (
              <button
                type="button"
                className="btn"
                onClick={() => handleAvailable(product.id)}
              >
                {loading === 'loading' ? (
                  <i className="fa fa-spinner fa-spin" />
                ) : (
                  <p>Enable</p>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageItem;

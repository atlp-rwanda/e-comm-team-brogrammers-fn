import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCartThunk from '../redux/features/actions/addCart';
import { showErrorMessage } from '../utils/toast';

function AddOne({ p, quantities, setQuantities }) {
  const { isLoading: addToCartLoading } = useSelector(
    (state) => state.addToCart
  );
  const dispatch = useDispatch();
  const addByOne = async (id) => {
    try {
      const newQuantity = Number(quantities[id] || 0) + 1;
      await dispatch(AddCartThunk({ id, quantities: newQuantity })).unwrap();
      setQuantities((prevState) => ({ ...prevState, [id]: newQuantity }));
    } catch (err) {
      showErrorMessage(err || 'Something went wrong');
    }
  };
  return (
    <button
      className="btn btn-danger minus"
      onClick={() => addByOne(p.id)}
      disabled={addToCartLoading}
      data-testid="increase-quantity"
      type="button"
    >
      +
    </button>
  );
}

export default AddOne;

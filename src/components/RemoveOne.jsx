import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage } from '../utils/toast';
import AddCartThunk from '../redux/features/actions/addCart';

function RemoveOne({ p, quantities, setQuantities }) {
  const { isLoading: addToCartLoading } = useSelector(
    (state) => state.addToCart
  );
  const dispatch = useDispatch();
  const reduceByOne = async (id) => {
    try {
      const newQuantity = Number(quantities[id]) - 1;
      if (newQuantity <= 0) {
        showErrorMessage('You cannot reduce the quantity to zero');
        return;
      }
      await dispatch(AddCartThunk({ id, quantities: newQuantity })).unwrap();
      setQuantities((prevState) => ({ ...prevState, [id]: newQuantity }));
    } catch (err) {
      showErrorMessage(err?.data?.message || 'Something went wrong');
    }
  };
  return (
    <button
      className="btn btn-primary minus"
      onClick={() => reduceByOne(p.id)}
      disabled={addToCartLoading}
      data-testid="reduce-quantity"
      type="button"
    >
      -
    </button>
  );
}

export default RemoveOne;

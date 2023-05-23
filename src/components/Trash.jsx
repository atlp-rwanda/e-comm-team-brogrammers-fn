import React from 'react';
import { useDispatch } from 'react-redux';
import ClearCartThunk from '../redux/features/actions/clearCart';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';

function Trash() {
  const dispatch = useDispatch();
  const RemoveAll = async () => {
    try {
      const res = await dispatch(ClearCartThunk()).unwrap();
      showSuccessMessage(res.value.message);
    } catch (error) {
      showErrorMessage(error?.data?.message || 'Something went wrong');
    }
  };
  return (
    <button
      className="btn1 inverse"
      onClick={() => RemoveAll()}
      data-testid="remove-all"
      type="button"
    >
      Empty cart
    </button>
  );
}

export default Trash;

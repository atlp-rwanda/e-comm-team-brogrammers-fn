import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
    <span>
      <FontAwesomeIcon
        icon={faTrash}
        size="sm"
        className="text-danger pointer er"
        onClick={() => RemoveAll()}
        data-testid="remove-all"
      />
    </span>
  );
}

export default Trash;

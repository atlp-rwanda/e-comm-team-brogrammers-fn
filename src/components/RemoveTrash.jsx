import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';
import RemoveCartThunk from '../redux/features/actions/removeCart';

function RemoveTrash({ p }) {
  const dispatch = useDispatch();
  const handleRemoveItem = async (itemId) => {
    try {
      const res = await dispatch(RemoveCartThunk(itemId)).unwrap();
      showSuccessMessage(res.message);
    } catch (error) {
      showErrorMessage(error?.data?.message || 'Something went wrong');
    }
  };
  return (
    <span>
      <FontAwesomeIcon
        icon={faTrash}
        size="lg"
        color="red"
        className="text-danger pointer"
        onClick={() => handleRemoveItem(p.id)}
        data-testid="remove-item"
      />
    </span>
  );
}

export default RemoveTrash;

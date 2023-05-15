import React, { useCallback } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import { deleteOrder as deleteOrderThunk } from '../../redux/features/actions/oneOrder';

export default function DeleteOrder({ order }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deletePopup = Swal.mixin({
    customClass: {
      confirmButton: 'btn1 btn-success swal-button',
      cancelButton: 'btn1 btn-danger swal-button',
    },
    buttonsStyling: false,
  });

  const deleteOrder = useCallback(async () => {
    try {
      await dispatch(deleteOrderThunk({ id: order.id })).unwrap();
      showSuccessMessage('order deleted successful');
      navigate(`/orders`);
    } catch (e) {
      if (e.error.message.toLowerCase() === 'network error') {
        showErrorMessage('Network Error');
        return;
      }
      showErrorMessage(e.error.response.data.message);
    }
  }, []);

  const verify = useCallback(() => {
    deletePopup
      .fire({
        text: `Are you sure you want to delete order No: ${order.orderNo}`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No, Cancel',
        confirmButtonText: 'Yes, Delete',
        reverseButtons: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          deleteOrder();
        }
      });
  });
  return (
    <button
      type="button"
      className="btn1 inverse"
      style={{ color: 'red' }}
      onClick={() => verify()}
      data-testid="delete-button"
    >
      Delete
    </button>
  );
}

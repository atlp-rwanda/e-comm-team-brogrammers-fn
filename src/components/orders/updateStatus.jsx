/* eslint-disable consistent-return */
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import css from './style.module.scss';
import orderSchema from '../../validations/orderStatus';
import { updateSingleOrderStatus } from '../../redux/features/actions/oneOrder';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import Select from '../select';

export default function UpdateStatus({ order }) {
  const dialog = useRef();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(orderSchema),
  });
  const { isLoading } = useSelector((state) => state.orders.selected.update);

  const closeModel = () => {
    if (typeof dialog.current.close === 'function') dialog.current.close();
  };
  const openModel = () => {
    if (typeof dialog.current.showModal === 'function')
      dialog.current.showModal();
  };

  const close = (e) => {
    const dialogDimensions = dialog.current.getBoundingClientRect();

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModel();
    }
  };

  const submit = async (data) => {
    try {
      await dispatch(
        updateSingleOrderStatus({
          id: order.id,
          data: {
            status: data.status,
          },
        })
      ).unwrap();
      showSuccessMessage('Update status complete successful');
      closeModel();
    } catch (e) {
      if (e.error.message.toLowerCase() === 'network error') {
        showErrorMessage('Network Error');
        return;
      }
      showErrorMessage(e.error.response.data.message);
    }
  };

  useEffect(() => {
    if (!dialog.current) return;

    dialog.current?.addEventListener('click', close);
    return () => {
      dialog.current?.removeEventListener('click', close);
    };
  }, [dialog, dialog.current]);

  return (
    <>
      <dialog ref={dialog} className={css.edit_form} data-testid="dialog">
        {!isLoading && order ? (
          <div>
            <form onSubmit={handleSubmit(submit)}>
              <h3>Edit Order Status</h3>
              <Select
                name="status"
                data-testid="status-select"
                placeholder={order.status}
                register={register('status')}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipping">Shipping</option>
              </Select>
              <div className={css.buttons}>
                <button
                  formMethod="dialog"
                  type="submit"
                  data-testid="close-button"
                  onClick={(e) => {
                    e.preventDefault();
                    closeModel();
                  }}
                  className="btn1 cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn1"
                  data-testid="submit-button"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="loader-2" />
        )}
      </dialog>
      <button
        type="button"
        data-testid="view-button"
        onClick={() => openModel()}
        className="bg-transparent no-border"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.359 8.36111L16.6366 9.63889L4.05499 22.2222H2.77739V20.9444L15.359 8.36111ZM20.3583 0C20.0111 0 19.65 0.138889 19.3862 0.402778L16.8449 2.94444L22.0525 8.15278L24.5938 5.61111C25.1354 5.06944 25.1354 4.19444 24.5938 3.65278L21.3443 0.402778C21.0665 0.125 20.7193 0 20.3583 0ZM15.359 4.43056L0 19.7917V25H5.20761L20.5666 9.63889L15.359 4.43056Z"
            fill="black"
          />
        </svg>
      </button>
    </>
  );
}

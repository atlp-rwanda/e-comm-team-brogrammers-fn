import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import css from './style.module.scss';
import orderSchema from '../../validations/order';
import Input from '../input';
import { createOrder } from '../../redux/features/actions/oneOrder';

export default function CreateOrder() {
  const model = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderSchema),
  });

  const { isLoading } = useSelector((state) => state.addToCart);
  const closeModel = useCallback(() => {
    if (model.current && typeof model.current.close === 'function')
      model.current.close();
  }, [model.current]);
  const openModel = () => {
    if (model.current && typeof model.current.showModal === 'function')
      model.current.showModal();
  };

  const close = (e) => {
    const dialogDimensions = model.current?.getBoundingClientRect();
    if (
      e.clientY < dialogDimensions.top ||
      e.clientX > dialogDimensions.right ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left
    ) {
      closeModel();
    }
  };

  useEffect(() => {
    model.current?.addEventListener('click', close);

    return () => {
      model.current?.removeEventListener('click', close);
    };
  }, [model, model.current]);

  const submit = useCallback(async (data) => {
    try {
      const res = await dispatch(
        createOrder({
          data: {
            deliveryStreet: data.street,
            deliveryCity: data.city,
            deliveryCountry: data.country,
          },
        })
      ).unwrap();
      showSuccessMessage('order complete successful');
      navigate(`/orders/${res.order.id}`);
    } catch (e) {
      if (e.error.message.toLowerCase() === 'network error') {
        showErrorMessage('Network Error');
        return;
      }
      showErrorMessage(e.error.response.data.message);
    }
  }, []);

  return (
    <>
      <dialog ref={model} className={css.edit_form} data-testid="dialog">
        {!isLoading ? (
          <div>
            <form onSubmit={handleSubmit(submit)}>
              <h3>Order products</h3>
              <Input
                placeholder="Delivery country"
                name="country"
                register={{ ...register('country') }}
                errors={errors?.country?.message}
              />
              <Input
                placeholder="Delivery city"
                name="city"
                register={{ ...register('city') }}
                errors={errors?.city?.message}
              />
              <Input
                placeholder="Delivery street"
                name="street"
                register={{ ...register('street') }}
                errors={errors?.street?.message}
              />
              <div className={css.buttons}>
                <button
                  formMethod="dialog"
                  data-testid="close-button"
                  type="submit"
                  className="btn1 cancel"
                  onClick={(e) => {
                    e.preventDefault();
                    closeModel();
                  }}
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
        className="checkout_btn btn1"
        onClick={() => openModel()}
        data-testid="checkout-button"
      >
        Order
      </button>
    </>
  );
}

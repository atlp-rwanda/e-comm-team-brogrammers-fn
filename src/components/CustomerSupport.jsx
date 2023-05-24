import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextArea from './textarea';
import AddMessageThunk from '../redux/features/actions/addMessage';

import messageSchema from '../validations/messageValidation';
import { showSuccessMessage } from '../utils/toast';
import Input from './input';

export default function CustomerSupport() {
  const { isLoading } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(messageSchema),
  });
  const submit = async (data) => {
    const { username, email, message } = data;
    dispatch(AddMessageThunk({ username, email, message }));
    reset();
    showSuccessMessage('message sent');
    // Close the dialog
  };
  return (
    <div className="feedback  back-angular" id="feedback">
      <h1>Customer Support</h1>
      <form
        action=""
        className="feedback__inputs  "
        onSubmit={handleSubmit(submit)}
      >
        <Input
          type="text"
          placeholder="Your name"
          id="username"
          register={register('username')}
        />
        {errors.username && (
          <p className="error" style={{ color: 'red' }}>
            {errors.username.message}
          </p>
        )}
        <Input
          type="email"
          placeholder="Your email"
          id="email"
          register={register('email')}
        />
        {errors.email && (
          <p className="error" style={{ color: 'red' }}>
            {errors.feedback.email}
          </p>
        )}
        <TextArea
          register={register('message')}
          name="message"
          placeholder="message"
          className="olivier"
        />
        {errors.message && (
          <p className="error" style={{ color: 'red' }}>
            {errors.message.message}
          </p>
        )}
        <button type="submit" value="send" className="button-2">
          {isLoading ? (
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          ) : (
            <span>
              {!isLoading && !errors ? 'signup Successful' : 'Submit'}
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

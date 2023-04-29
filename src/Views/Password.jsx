import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/input';
import changePasswordSchema from '../validations/changePassword';
import PasswordThunk from '../redux/features/actions/password';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';

function ChangePassword() {
  const { isLoading, error, errorMessage, successMessage } = useSelector(
    (state) => state.password
  );
  useEffect(() => {
    if (errorMessage) {
      showErrorMessage(errorMessage);
    } else {
      showSuccessMessage(successMessage);
    }
  }, [error, errorMessage, successMessage, isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const { currentPassword, newPassword } = data;
    dispatch(PasswordThunk({ oldPassword: currentPassword, newPassword }));
    reset();
  };

  return (
    <section className="center-xy">
      <div className="sign back-angular">
        <h2>Change Password</h2>
        <form
          className="change-password"
          onSubmit={handleSubmit(onSubmit)}
          data-testid="change-password-form"
        >
          <Input
            type="password"
            placeholder="Current Password"
            register={{ ...register('currentPassword') }}
            errors={errors?.currentPassword?.message}
            data-testid="current-password-input"
          />
          <Input
            type="password"
            placeholder="New Password"
            register={{ ...register('newPassword') }}
            errors={errors?.newPassword?.message}
            data-testid="new-password-input"
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            register={{ ...register('confirmPassword') }}
            errors={errors?.confirmPassword?.message}
            data-testid="confirm-password-input"
          />
          <button type="submit" className="btn1" data-testid="submit">
            {isLoading ? (
              <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
              </div>
            ) : (
              <span>
                {successMessage ? 'Password changed! ' : 'Change Password'}
              </span>
            )}
          </button>
          {error && (
            <p className="error" data-testid="form-error">
              {errorMessage}
            </p>
          )}
        </form>

        <p>
          <b>
            <Link to="/">Back to Homepage</Link>
          </b>
        </p>
      </div>
    </section>
  );
}

export default ChangePassword;

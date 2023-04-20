import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/input';
import changePasswordSchema from '../validations/changePassword';
import PasswordThunk from '../redux/features/actions/password';

function ChangePassword() {
  const navigate = useNavigate();
  const { isLoading, error, errorMessage, successMessage } = useSelector(
    (state) => state.password
  );

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => navigate('/'), 3000);
    }
  }, [successMessage, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
    const { currentPassword, newPassword } = data;
    dispatch(PasswordThunk({ oldPassword: currentPassword, newPassword }));
    reset();
  };

  return (
    <section className="center-xy">
      <div className="sign back-angular">
        <h2>Change Password</h2>
        <form className="change-password" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="password"
            placeholder="Current Password"
            register={{ ...register('currentPassword') }}
            errors={errors?.currentPassword?.message}
          />
          <Input
            type="password"
            placeholder="New Password"
            register={{ ...register('newPassword') }}
            errors={errors?.newPassword?.message}
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            register={{ ...register('confirmPassword') }}
            errors={errors?.confirmPassword?.message}
          />
          <button type="submit" className="btn1">
            {isLoading ? (
              <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
              </div>
            ) : (
              <span>
                {successMessage ? 'Password Changed' : 'Change Password'}
              </span>
            )}
          </button>
          {error && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
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

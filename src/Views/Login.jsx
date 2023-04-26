import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/input';
import loginSchema from '../validations/login';
import LoginThunk from '../redux/features/actions/login';
import GoogleLoginButton from '../components/GoogleLoginButton';

function Login() {
  const navigate = useNavigate();
  const { error, errorMessage, loading, token } = useSelector((s) => s.login);

  useEffect(() => {
    if (!loading && !error && token) {
      setTimeout(() => navigate('/'), 3000);
    }
  }, [error, errorMessage, loading, token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const submit = (data) => {
    dispatch(LoginThunk(data));
    reset();
  };
  return (
    <section className="center-xy">
      <div className="sign back-angular" data-testid="sign_div">
        <h2>Login to your account</h2>
        <form
          className="login"
          onSubmit={handleSubmit(submit)}
          data-testid="login-form"
        >
          <Input
            type="text"
            placeholder="Email"
            register={{ ...register('email') }}
            errors={errors?.email?.message}
          />
          <Input
            type="password"
            placeholder="Password"
            register={{ ...register('password') }}
            errors={errors?.password?.message}
          />
          <button type="submit" className="btn1" data-testid="submit">
            {loading ? (
              <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
              </div>
            ) : (
              <span>
                {!loading && !error && token ? 'Login Successful' : 'Log in'}
              </span>
            )}
          </button>
          {error && (
            <p className="error" data-testid="form-error">
              {errorMessage}
            </p>
          )}
        </form>
        <Link to="/reset-pass">Forgot password?</Link>
        <GoogleLoginButton />
        <p>
          Don’t have account?{' '}
          <b>
            <Link to="/">Signup</Link>
          </b>
        </p>
      </div>
    </section>
  );
}

export default Login;

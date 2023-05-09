import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Input from '../components/input';
import signupSchema from '../validations/signup';
import signupThunk from '../redux/features/actions/signup';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';
import Select from '../components/select';

function Signup() {
  const { isLoading, errorMessage, successMessage } = useSelector(
    (state) => state.signup
  );
  useEffect(() => {
    if (errorMessage) {
      showErrorMessage(errorMessage);
    } else {
      showSuccessMessage(successMessage);
    }
  }, [errorMessage, isLoading, successMessage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const dispatch = useDispatch();
  const submit = async (datas) => {
    const { email, password, username, gender } = datas;
    dispatch(signupThunk({ email, password, username, gender }));
    reset();
  };
  return (
    <section className="center-xy">
      <div className="sign back-angular" data-testid="signup-div">
        <h2>Create Account Here</h2>
        <form
          className="login "
          onSubmit={handleSubmit(submit)}
          data-testid="signup-form"
        >
          <Input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            register={register('email')}
            errors={errors?.email?.message}
          />

          <Input
            type="text"
            placeholder="Enter username"
            name="username"
            register={register('username')}
            errors={errors?.username?.message}
          />

          <Select
            name="gender"
            placeholder="Gender"
            register={register('gender')}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Both">Both</option>
            <option value="None">None</option>
          </Select>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
          <Input
            type="password"
            name="password"
            placeholder="Enter your Password"
            register={register('password')}
            errors={errors?.password?.message}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Re-Enter your Password"
            register={register('confirmPassword')}
            errors={errors?.confirmPassword?.message}
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
                {!isLoading && !errors ? 'signup Successful' : 'signup '}
              </span>
            )}
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <p className="error" data-testid="form-error" />
        </form>
        <b className="or">Or</b>
        <GoogleLoginButton text="Signup with google" />
        <p>
          Already have account?{' '}
          <b>
            <Link to="/login">Login</Link>
          </b>
        </p>
      </div>
    </section>
  );
}

export default Signup;

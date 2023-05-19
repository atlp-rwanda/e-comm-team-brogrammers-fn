/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSlice } from '../../redux/features/slices/login';
import Input from '../input';

const mfaCodeSchema = yup.object().shape({
  mfa_code: yup
    .string()
    .matches(/\d+/, { message: 'MFA code should be numeric' }),
});

function Mfa({ email }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    resolver: yupResolver(mfaCodeSchema),
  });

  const submit = (data) => {
    toast.promise(
      axios.post(`${process.env.REACT_APP_SERVER_URL}/users/verify-mfa`, {
        mfa_code: Number(data.mfa_code),
        email,
      }),
      {
        success: (result) => {
          dispatch(loginSlice.actions.login({ token: result.data.token }));
          return 'MFA code was validated succesfully!';
        },
        error: (err) => `Error. ${err.response.data.message}`,
        loading: 'Verifying mfa code..',
      }
    );
    reset();
  };

  return (
    <div className="sign back-angular" data-testid="sign_div">
      <h2>Check Mutli-Factor code from you email.</h2>
      <form
        className="login"
        onSubmit={handleSubmit(submit)}
        data-testid="login-form"
      >
        <Input
          type="text"
          placeholder="MFA Code"
          register={{ ...register('mfa_code', { valueAsNumber: true }) }}
          errors={errors?.mfa_code?.message}
        />

        <button type="submit" className="btn1" data-testid="submit">
          {isSubmitting ? (
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          ) : (
            <span>Verify</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default Mfa;

import React, { useEffect, useState } from 'react';

import './settings.scss';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import UserThunk from '../../redux/features/actions/user';
import axios from '../../redux/configs/axios';

function Settings() {
  const dispatch = useDispatch();

  function getLoginState(state) {
    return state.login;
  }
  function getUserState(state) {
    return state.user;
  }

  const { token, loading: loadingToken } = useSelector(getLoginState);
  const { loading: loadingUser, user } = useSelector(getUserState);
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);

  useEffect(() => {
    const isLoginFinished = !loadingToken && token;
    if (isLoginFinished) {
      dispatch(UserThunk());
    }
  }, [token]);

  useEffect(() => {
    const isUserMfaEnabled = Boolean(user && user.mfa_enabled);
    setIsMfaEnabled(isUserMfaEnabled);
  }, [user]);

  const handleToggleMfa = () => {
    // This will handle both disabling or enabling MFA
    const action = isMfaEnabled ? 'disable' : 'enable';

    const onSuccess = () => {
      setIsMfaEnabled(action === 'enable');
      return `MFA was ${action}d succesfully.`;
    };
    const onError = (err) => `MFA was not ${action}d. ${err?.message}`;
    const requestData = {};
    const authenticationHeader = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const enableOrDisableMfa = axios.post(
      `/users/${action}-mfa`,
      requestData,
      authenticationHeader
    );
    toast.promise(enableOrDisableMfa, {
      success: onSuccess,
      error: onError,
      loading: `trying ${action} MFA`,
    });
  };

  // User or login still loading.
  const isStillLoading = !token || loadingUser || loadingToken;

  return (
    <div className="settings-page" data-testid="settings-page">
      <div className="section">
        <div className="title">Mutli-Factor Authentication</div>
        {isStillLoading ? (
          <span className="loader" />
        ) : (
          <div className="option">
            <div className="label">Enable MFA</div>
            <label htmlFor="mfa" className="toggle-switch">
              <input
                onChange={handleToggleMfa}
                defaultChecked={isMfaEnabled}
                data-testid="mfa"
                type="checkbox"
                id="mfa"
              />
              <span className="slider" />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;

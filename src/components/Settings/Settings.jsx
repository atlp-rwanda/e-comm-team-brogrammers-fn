import React, { useEffect, useState } from 'react';

import './settings.scss';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import UserThunk from '../../redux/features/actions/user';
import axios from '../../redux/configs/axios';

function Settings() {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading: tokenLoad } = useSelector((s) => s.login);
  const { loading } = useSelector((s) => s.user);
  const [enabled, setEnabled] = useState(0);

  useEffect(() => {
    if (!tokenLoad && token) {
      dispatch(UserThunk());
    }
  }, [token]);

  useEffect(() => {
    if (enabled === 0) return;
    const action = enabled ? 'disable' : 'enable';
    toast.promise(
      axios.post(
        `/users/${action}-mfa`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      ),
      {
        success: () => `MFA was ${action}d succesfully.`,
        error: (err) => `MFA was not ${action}d. ${err?.message}`,
        loading: `trying ${action} MFA`,
      }
    );
  }, [enabled, token]);

  const handleEnableMfa = () => {
    setEnabled((p) => (p === 0 ? false : !p));
  };

  return (
    <div className="settings-page" data-testid="settings-page">
      <div className="section">
        <div className="title">Mutli-Factor Authentication</div>
        {!token || loading || tokenLoad ? (
          <span className="loader" />
        ) : (
          <div className="option">
            <div className="label">Enable MFA</div>
            <label htmlFor="mfa" className="toggle-switch">
              <input
                onChange={handleEnableMfa}
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

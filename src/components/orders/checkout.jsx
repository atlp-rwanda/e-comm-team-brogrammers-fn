import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StripePay } from '../../redux/features/actions/payment';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';

export default function Checkout({ id }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const pay = useCallback(async () => {
    setLoading(true);
    try {
      const res = await dispatch(StripePay({ id })).unwrap();
      setLoading(false);
      window.open(res.url, '_blank', 'noopener,noreferrer');
      showSuccessMessage('Payment complete successful');
    } catch (e) {
      setLoading(false);
      if (e.error.message.toLowerCase() === 'network error') {
        showErrorMessage('Network Error');
        return;
      }
      showErrorMessage(e.error.response.data.error.message);
    }
  }, []);

  return (
    <button
      type="button"
      className="btn1"
      data-testid="ckeckout-btn"
      onClick={pay}
      disabled={loading}
    >
      {loading ? (
        <div className="lds-ellipsis active" data-testid="ckeckout-loader">
          <div />
          <div />
          <div />
          <div />
        </div>
      ) : (
        <>Checkout</>
      )}
    </button>
  );
}

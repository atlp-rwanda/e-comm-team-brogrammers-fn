/* eslint-disable consistent-return */
import React, { useCallback } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import subscribeThunk from '../redux/features/actions/subscribe';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';

function Subscribe() {
  const dispatch = useDispatch();

  const subscribePopup = Swal.mixin({
    customClass: {
      confirmButton: 'btn1 btn-success swal-button',
      cancelButton: 'btn1 btn-danger swal-button',
    },
    buttonsStyling: false,
  });

  const subscribe = useCallback(async (data) => {
    try {
      await dispatch(subscribeThunk(data)).unwrap();
      showSuccessMessage('Check your email for verification');
    } catch (error) {
      if (error.message.toLowerCase() === 'network error') {
        showErrorMessage('Network Error');
        return;
      }
      showErrorMessage(error.response.data.message);
    }
  });

  const subscribeForm = useCallback(() => {
    subscribePopup
      .fire({
        title: 'Subscribe here',
        html: `
        <div class="fast-inputs">
          <p>Fill the form here to stay updated to our newsletter.</p>
          <input id="fname" placeholder="First name">
          <input id="lname" placeholder="Last name">
          <input id="email" placeholder="Email" type="email">
        </div>`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Subscribe',
        reverseButtons: true,
        preConfirm: () => {
          const values = {
            firstName: document.getElementById('fname').value,
            lastName: document.getElementById('lname').value,
            email: document.getElementById('email').value,
          };
          if (!values.email || !values.firstName || !values.lastName)
            subscribePopup.showValidationMessage(
              'all data above are required to subscribe!!'
            );
          else return values;
        },
      })
      .then((res) => {
        if (res.isConfirmed) {
          subscribe(res.value);
        }
      });
  }, []);
  return (
    <div className="subscribe">
      <p>
        Subscribe to our newsletter
        <br /> to stay updated.
      </p>
      <button type="button" className="btn1 inverse" onClick={subscribeForm}>
        subscribe
      </button>
    </div>
  );
}

export default Subscribe;

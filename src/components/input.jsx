import React, { useState } from 'react';

function Input({
  type = 'text',
  placeholder,
  className = '',
  defaultValue = '',
  register = null,
  name = '',
  errors,
  required,
}) {
  const [inputType, setInputType] = useState(type);

  const seePassword = (e) => {
    e.preventDefault();
    if (inputType.toLowerCase() === 'password') {
      setInputType('text');
      return;
    }
    setInputType('password');
  };
  return (
    <div className="input">
      <div className={`input-1 ${className}`}>
        <input
          type={inputType}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          name={name}
          {...register}
          data-testid="input-element"
        />
        {type.toLowerCase() === 'password' && (
          <span
            className="icon"
            onClick={seePassword}
            role="presentation"
            data-testid="see-button"
          >
            <svg
              width="28"
              height="15"
              viewBox="0 0 31 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 3.20833C20.7112 3.20833 25.3587 6.22583 27.6275 11C25.3587 15.7742 20.725 18.7917 15.5 18.7917C10.275 18.7917 5.64125 15.7742 3.3725 11C5.64125 6.22583 10.2887 3.20833 15.5 3.20833ZM15.5 0.375C8.625 0.375 2.75375 4.78083 0.375 11C2.75375 17.2192 8.625 21.625 15.5 21.625C22.375 21.625 28.2462 17.2192 30.625 11C28.2462 4.78083 22.375 0.375 15.5 0.375ZM15.5 7.45833C17.3975 7.45833 18.9375 9.045 18.9375 11C18.9375 12.955 17.3975 14.5417 15.5 14.5417C13.6025 14.5417 12.0625 12.955 12.0625 11C12.0625 9.045 13.6025 7.45833 15.5 7.45833ZM15.5 4.625C12.09 4.625 9.3125 7.48667 9.3125 11C9.3125 14.5133 12.09 17.375 15.5 17.375C18.91 17.375 21.6875 14.5133 21.6875 11C21.6875 7.48667 18.91 4.625 15.5 4.625Z"
                fill="#111111"
              />
            </svg>
          </span>
        )}
      </div>
      {errors && (
        <>
          <p className="error" data-testid="errors">
            {errors}
          </p>
          <p className="success" data-testid="success">
            {}
          </p>
        </>
      )}
    </div>
  );
}

export default Input;

import React, { Children } from 'react';

function Select({
  placeholder,
  className = '',
  register = null,
  name = '',
  id = '',
  errors,
  options = [],
  required,
  children,
}) {
  return (
    <div className="input">
      <div className={`input-1 ${className}`}>
        <select
          placeholder={placeholder}
          required={required}
          name={name}
          id={id}
          {...register}
          data-testid="select-element"
        >
          {placeholder && (
            <option value="" selected disabled className="placeholder">
              {placeholder}
            </option>
          )}
          {options && Array.isArray(options) && options.length > 0
            ? options.map((option) => (
                <option
                  value={option?.value || option}
                  key={option?.value || option}
                >
                  {option?.text || option}
                </option>
              ))
            : Children.map(children, (child) =>
                React.cloneElement(child, {
                  className: `${child.props.className} img-special-class`,
                })
              )}
        </select>
      </div>
      {errors && (
        <p className="error" data-testid="errors">
          {errors}
        </p>
      )}
    </div>
  );
}

export default Select;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Children } from 'react';

function Select({
  placeholder,
  onChange,
  className = '',
  register = null,
  name = '',
  id = '',
  errors,
  options = [],
  required,
  children,
  label,
}) {
  return (
    <label className="input">
      {label && <span className="label">{label}</span>}
      <div className={`input-1 ${className}`}>
        <select
          placeholder={placeholder}
          required={required}
          name={name}
          onChange={onChange}
          id={id}
          {...register}
          data-testid="select-element"
          defaultValue={placeholder && ''}
        >
          {placeholder && (
            <option value="" disabled className="placeholder">
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
    </label>
  );
}

export default Select;

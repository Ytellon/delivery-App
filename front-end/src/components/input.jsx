import React from 'react';
import propTypes from 'prop-types';
import './input.css';

export default function Input(
  { type, name, dataTestId, value, onChange, placeholder, classes },
) {
  return (
    <label htmlFor={ name }>
      <h4 className="align-start">{ name }</h4>
      <input
        className={ classes }
        type={ type }
        name={ name }
        id={ name }
        data-testid={ dataTestId }
        value={ value }
        onChange={ onChange }
        placeholder={ placeholder }
      />
    </label>
  );
}

Input.propTypes = {
  type: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  dataTestId: propTypes.string.isRequired,
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]).isRequired,
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string.isRequired,
  classes: propTypes.string.isRequired,
};

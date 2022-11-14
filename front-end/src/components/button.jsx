import React from 'react';
import propTypes from 'prop-types';

export default function Button({ type, name, dataTestId, onClick, disabled, classes }) {
  return (
    <button
      className={ classes }
      type={ type === 'submit' ? 'submit' : 'button' }
      data-testid={ dataTestId }
      onClick={ onClick }
      disabled={ disabled }
    >
      { name }

    </button>
  );
}

Button.propTypes = {
  type: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  dataTestId: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  disabled: propTypes.bool.isRequired,
  classes: propTypes.string.isRequired,
};

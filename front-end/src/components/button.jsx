import React from 'react';
import propTypes from 'prop-types';

export default function Button({ type, name, dataTestId, onClick }) {
  return (
    <button
      type={ type === 'submit' ? 'submit' : 'button' }
      data-testid={ dataTestId }
      onClick={ onClick }
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
};

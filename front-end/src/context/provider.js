import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import customContext from './customContext';

export default function Provider({ children }) {
  const [state, setState] = React.useState({
    user: {
      name: 'John Doe',
      email: '',

    },
  });

  const contextValue = useMemo(() => ({ state, setState }), [state, setState]);

  return (
    <customContext.Provider value={ contextValue }>
      {children}
    </customContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

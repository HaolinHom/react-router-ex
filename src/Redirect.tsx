import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RedirectExProps } from './types';

const Redirect = (props: RedirectExProps) => {
  const { redirect, path, children } = props;

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!redirect) {
      return;
    }
    if (location.pathname === path) {
      history.push(redirect);
    }
  }, [location.pathname, redirect, path, history]);

  return <>{children}</>;
};

export default Redirect;

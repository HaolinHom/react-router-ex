import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Redirect = (props: {
  route: {
    path: string;
    redirect: string;
  };
  children?: React.ReactNode;
}) => {
  const { route, children } = props;

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!route.redirect) {
      return;
    }
    if (location.pathname === route.path) {
      history.push(route.redirect);
    }
  }, [location.pathname, route, history]);

  return <>{children}</>;
};

export default Redirect;

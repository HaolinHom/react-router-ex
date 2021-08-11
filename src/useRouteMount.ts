import { useContext } from 'react';
import RouterContext from './RouterContext';

const useRouteMount = () => {
  return useContext(RouterContext);
};

export default useRouteMount;

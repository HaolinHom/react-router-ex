import { useContext } from 'react';
import RouterContext from './RouterContext';
import { Context } from './types';

const useRouteMount = (): Context => {
  const {
    mounted,
    setMounted,
    getMount,
    doMount,
    doUnmount,
  } = useContext(RouterContext);
  return {
    mounted,
    setMounted,
    getMount,
    doMount,
    doUnmount,
  }
};

export default useRouteMount;

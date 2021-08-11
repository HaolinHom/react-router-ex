import React, { useState } from 'react';
import RouterContext from './RouterContext';
import { Context, Mounted } from './types';

const Router = (props) => {
  const { children } = props;

  const [mounted, setMounted] = useState<Mounted>({});

  const getMount = (path?: string): boolean => {
    if (!path) {
      return false;
    }
    return mounted[path];
  };

  const updateMount = (path: string | string[], mount: boolean) => {
    if (typeof path === 'string') {
      setMounted({
        ...mounted,
        [path]: mount,
      });
    } else if (Array.isArray(path)) {
      setMounted({
        ...mounted,
        ...path.reduce((accumulate, current) => {
          accumulate[current] = mount;
          return accumulate;
        }, {}),
      });
    }
  };

  const doMount = (path: string | string[]) => {
    updateMount(path, true);
  };

  const doUnMount = (path: string | string[]) => {
    updateMount(path, false);
  };

  const provider = {
    mounted,
    setMounted,
    getMount,
    doMount,
    doUnMount,
  } as Context;

  return (
    <RouterContext.Provider value={provider}>{children}</RouterContext.Provider>
  );
};

export default Router;

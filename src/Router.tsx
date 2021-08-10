import React, { useState } from 'react';
import RouterContext from './RouterContext';
import { Context, Mounted } from './types';

const Router = (props) => {
  const { children } = props;

  const [mounted, setMounted] = useState<Mounted>({});

  const _getAllMounted = (): Mounted => {
    return mounted;
  };

  const _getMounted = (path: string): boolean => {
    return mounted[path];
  };

  const _setMounted = (path: string) => {
    setMounted({
      ...mounted,
      [path]: true,
    });
  };

  const _setUnMounted = (path: string | string[]) => {
    if (typeof path === 'string') {
      setMounted({
        ...mounted,
        [path]: false,
      });
    } else if (Array.isArray(path)) {
      setMounted({
        ...mounted,
        ...path.reduce((accumulate, current) => {
          accumulate[current] = false;
          return accumulate;
        }, {}),
      });
    }
  };

  const provider = {
    getAllMounted: _getAllMounted,
    getMounted: _getMounted,
    setMounted: _setMounted,
    setUnMounted: _setUnMounted,
  } as Context;

  return (
    <RouterContext.Provider value={provider}>{children}</RouterContext.Provider>
  );
};

export default Router;

import React from 'react';
import { Context } from './types';

const context = React.createContext<Context>({
  getAllMounted: () => ({}),
  getMounted: (path) => false,
  setMounted: (path) => undefined,
  setUnMounted: (path) => undefined,
});

context.displayName = 'RouterEx';

export default context;

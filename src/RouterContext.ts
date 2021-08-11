import React from 'react';
import { Context } from './types';

const context = React.createContext<Context>({
  mounted: {},
  setMounted: () => undefined,
  getMount: () => false,
  doMount: () => undefined,
  doUnmount: () => undefined,
});

context.displayName = 'RouterEx';

export default context;

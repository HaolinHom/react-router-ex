# react-router-ex

The react-router-ex is a [react-router-dom](https://www.npmjs.com/package/react-router-dom) extension, 
it provides keep alive route after the route component mounted.

## Install

```shell
pnpm add react-router-ex
# or
npm i react-router-ex
# or
yarn add react-router-ex
```

## Documentation

- [Router](#Router)
- [Switch](#Switch)
- [Route](#Route)
- [useRouteMount](#useRouteMount)

### Router

`Router` component must be called before `Switch` or `Route` component.

### Switch

Refer to the [react-router-dom Switch component documentation](https://reactrouter.com/web/api/Switch).

special API:

| Property | Description | Type | Default |
|----|----|----|----|
| onChange | When route is match, it will execute. | (location) => void | - |

### Route

Refer to the [react-router-dom Route component documentation](https://reactrouter.com/web/api/Route).

### useRouteMount

```javascript
import { useRouteMount } from 'react-router-ex';

const Root = () => {
  const {
    mounted,
    setMounted,
    getMount,
    doMount,
    doUnMount,
  } = useRouteMount();
  
  // do something
};
```

It is syntactic sugar for use Context (Router Context):

```javascript
import { useContext } from 'react';
import { RouterContext } from 'react-router-ex';

const Root = () => {
  const {
    mounted,
    setMounted,
    getMount,
    doMount,
    doUnmount,
  } = useContext(RouterContext);

  // do something
};
```

API:

| Property | Description | Type | Default |
|----|----|----|----|
| mounted | Store the mount status of the route | Mounted({ [path: string ]: boolean }) | {} |
| setMounted | update mounted | (Mounted) => void | - |
| getMount | Get the mount status of a route | (path: string) => boolean | - |
| doMount | Update the mount status to mounted | (path: string / string[]) => void | - |
| doUnmount | Update the mount status to unmounted | (path: string / string[]) => void | - |

## Usage

You can use it like using react-router-dom.

Basic usage:

```javascript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router, Switch, Route } from 'react-router-ex';

const Foo = () => {
  return (
    <div>foo</div>
  );
};

const Bar = () => {
  return (
    <div>bar</div>
  );
};

const Index = () => {
  return (
    <div>index</div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Router>
        <Switch>
          <Route path='/foo'>
            <Foo/>
          </Route>
          <Route path='/bar'>
            <Bar/>
          </Route>
          <Route path='/'>
            <Index/>
          </Route>
        </Switch>
      </Router>
    </BrowserRouter>
  );
};

export default App;
```

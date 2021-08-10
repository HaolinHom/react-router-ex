import React, { useContext, useEffect } from 'react';
import { useHistory, matchPath } from 'react-router-dom';
import RouterContext from './RouterContext';
import { ComputedMatch, RouteProps } from './types';

function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
}

const Route = (props: RouteProps) => {
  let { computedMatch, location, path, children, component, render } = props;

  const history = useHistory();

  const { getMounted, setMounted } = useContext(RouterContext);
  const mount = getMounted(path);

  let match = null as ComputedMatch;
  if (computedMatch) {
    match = computedMatch;
  } else if (path && location?.pathname) {
    match = matchPath(location.pathname, props);
  }

  const newProps = {
    history,
    location,
    match,
  };

  if (Array.isArray(children) && isEmptyChildren(children)) {
    children = null;
  }

  const renderMatch = (mount) => {
    if (mount) {
      if (children) {
        // @ts-ignore
        return typeof children === 'function' ? children(newProps) : children;
      } else if (component) {
        return React.createElement(component, newProps);
      } else if (render) {
        // @ts-ignore
        return render(newProps);
      }
    } else {
      // @ts-ignore
      return typeof children === 'function' ? children(newProps) : children;
    }
  };

  useEffect(() => {
    if (!mount && match && path) {
      setMounted(path);
    }
  }, [mount, match, setMounted, path]);

  return <>{renderMatch(mount)}</>;
};

export default Route;

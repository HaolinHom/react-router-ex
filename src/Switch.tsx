import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { SwitchProps, SwitchChild } from './types';

const Switch = (props: SwitchProps) => {
  const { children, onChange } = props;

  const location = useLocation();

  let isMatch = false;

  return (
    <>
      {React.Children.map(children, (child: SwitchChild) => {
        if (React.isValidElement(child)) {
          let visible = false;
          let match;
          if (!isMatch) {
            const path = child.props.path || child.props.from;
            match = path
              ? matchPath(location.pathname, { ...child.props, path })
              : undefined;
            if (match) {
              isMatch = true;
              visible = true;
              if (typeof onChange === 'function' && match.path !== '*') {
                onChange(location);
              }
            }
          }
          return (
            <div
              id={child.props.path}
              style={{ display: visible ? 'block' : 'none' }}
            >
              {React.cloneElement(child, { location, computedMatch: match })}
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default Switch;

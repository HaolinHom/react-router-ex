import React, { useRef, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { SwitchProps, SwitchChild } from './types';
import clone from 'lodash.clone';

const Switch = (props: SwitchProps) => {
  const { children, onChange } = props;

  const location = useLocation();

  const emitChangeRef = useRef(typeof onChange === 'function');
  let isMatch = false;
  let params;

  useEffect(() => {
    if (params && typeof onChange === 'function') {
      onChange(params);
    }
  }, [onChange, params]);

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
              if (emitChangeRef.current && match.path !== '*') {
                params = clone(location);
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

import type { Button } from '../button';
import type { ReactElement } from 'react';

import React, { cloneElement } from 'react';
import clsx from 'clsx';

import classes from './button-group.module.css';

type ButtonGroupDirection = 'vertical' | 'horizontal';

export interface ButtonGroupProps {
  direction?: ButtonGroupDirection;
  children: ReactElement<typeof Button> | Array<ReactElement<typeof Button>>;
}

export const ButtonGroup = (props: ButtonGroupProps) => {
  const {
    direction = 'horizontal',
    children,
  } = props;

  const buttonGroupClasses = clsx(
    classes['button-group'],
    classes[`button-group-direction-${direction}`],
  );

  return (
    <div className={buttonGroupClasses}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return cloneElement(
            child,
          );
        }
        return child;
      })}
    </div>
  );
};

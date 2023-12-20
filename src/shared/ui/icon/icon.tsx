import type { HTMLAttributes, SVGAttributes } from 'react';

import clsx from 'clsx';

import classes from './icon.module.css';

interface IconProps extends HTMLAttributes<HTMLElement> {
  size: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
  icon?: React.ComponentType<SVGAttributes<SVGElement>>;
  isActive?: boolean;
}

export const Icon = (props: IconProps) => {
  const {
    size = 'medium',
    icon: Icon,
    className,
    ...restProps
  } = props;
  return (
    <span className={clsx(classes.icon, className)} {...restProps}>
      <span
        className={clsx(classes[`icon-size-${size}`])}
      >
        {Icon && <Icon className={classes[`icon-size-${size}`]} />}
      </span>
    </span>
  );
};

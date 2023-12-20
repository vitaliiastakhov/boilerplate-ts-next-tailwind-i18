import type { ButtonHTMLAttributes } from 'react';

import { forwardRef } from 'react';
import { clsx } from 'clsx';

import { Text } from '@/ui/text';

import { Icon as IconTypes } from '../../icon/icon';
import { Spinner } from '../../spinner/spinner';
import classes from './button.module.css';

type IconTypes = React.ComponentType;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?:
    | 'primary'
    | 'ghost'
    | 'success'
    | 'warning'
    | 'danger'
    | 'secondary';
  size?: 'medium' | 'large' | 'small';
  align?: 'center' | 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
  isActive?: boolean;
  iconOnly?: boolean;
  leftIcon?: IconTypes;
  rightIcon?: IconTypes;
  icon?: IconTypes | null;
}

const Button = (
  props: ButtonProps,
  ref?: React.Ref<HTMLButtonElement>,
) => {
  const {
    children,
    className,
    disabled,
    type = 'button',
    appearance = 'secondary',
    size = 'medium',
    align = 'center',
    fullWidth = false,
    isLoading = false,
    isActive = false,
    iconOnly = false,
    leftIcon,
    rightIcon,
    icon,
    onClick,
    ...restProps
  } = props;

  const buttonClasses = clsx(
    classes.button,
    classes[`button-size-${size}`],
    { [classes[`button-size-icon-only-${size}`]]: iconOnly },
    classes[`button-appearance-${appearance}`],
    { [classes[`button-appearance-${appearance}-selected`]]: isActive },
    classes[`button-align-${align}`],
    {
      [classes['full-width']]: fullWidth,
    },
  );

  const spinnerMarkup = isLoading
    ? (
      <span className={classes.spinner}>
        <Spinner
          size='extra-small'
          className={classes[`button-icon-size-${size}`]}
        />
      </span>
    )
    : null;

  const leftIconMarkup = leftIcon && !iconOnly
    ? (
      <IconTypes
        className={clsx({ [classes.invisible]: isLoading })}
        isActive={isActive}
        icon={leftIcon}
        size={size}
      />
    )
    : null;

  const childrenMarkup = !iconOnly
    ? (
      <Text
        as='span'
        size='body-small'
        className={clsx({ [classes.invisible]: isLoading })}
      >
        {children}
      </Text>
    )
    : null;

  const rightIconMarkup = rightIcon && !iconOnly
    ? (
      <IconTypes
        className={clsx({ [classes.invisible]: isLoading })}
        isActive={isActive}
        icon={rightIcon}
        size={size}
      />
    )
    : null;

  const iconMarkup = iconOnly && (icon || leftIcon || rightIcon)
    ? (
      <IconTypes
        className={clsx({ [classes.invisible]: isLoading })}
        isActive={isActive}
        icon={icon || leftIcon || rightIcon}
        size={size}
      />
    )
    : null;

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={isLoading ? undefined : onClick}
      className={buttonClasses}
      ref={ref}
      {...restProps}
    >
      {spinnerMarkup}
      {leftIconMarkup}
      {childrenMarkup}
      {iconMarkup}
      {rightIconMarkup}
    </button>
  );
};

const ForwardedButton = forwardRef(Button);

export { ForwardedButton as Button };

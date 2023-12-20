import type { LabelHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import classes from './label.module.css';

interface LabelProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'>
{
  size?: 'medium' | 'large';
  disabled?: boolean;
  requiredSignAppearance?: 'default' | 'colorized';
  required?: boolean;
  requiredSign?: ReactNode;
  label?: string;
}

export const Label = (props: LabelProps) => {
  const {
    label,
    size = 'medium',
    requiredSignAppearance = 'default',
    required = false,
    requiredSign = '*',
    ...restProps
  } = props;

  const labelClasses = clsx(classes.label, classes[`label-size-${size}`]);

  return (
    <label className={labelClasses} {...restProps}>
      {label}
      {required && (
        <span
          className={classes[
            `label-required-sign-appearance-${requiredSignAppearance}`
          ]}
        >
          {requiredSign}
        </span>
      )}
    </label>
  );
};

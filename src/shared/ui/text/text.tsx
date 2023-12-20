import type { HTMLAttributes, ReactNode } from 'react';

import { clsx } from 'clsx';

import classes from './text.module.css';

export type AllowedElements = keyof Pick<
  JSX.IntrinsicElements,
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'strong'
  | 'legend'
  | 'dt'
  | 'dd'
>;

type FontWeight = 'normal' | 'medium' | 'bold';

type AsVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-small'
  | 'body-medium'
  | 'body-large'
  | 'body-extra-large';

type TextDecoration = 'underline' | 'none';

export interface DynamicComponentProps extends HTMLAttributes<HTMLElement> {
  as: AllowedElements;
  children?: ReactNode;
  fontWeight?: FontWeight;
  size?: AsVariant;
  textDecoration?: TextDecoration;
}

export const Text = ({
  as: Component = 'h2',
  textDecoration = 'none',
  fontWeight,
  size,
  className,
  ...elementProps
}: DynamicComponentProps) => {
  const headingClasses = clsx(
    classes.text,
    fontWeight && classes[`font-weight-${fontWeight}`],
    size && classes[`${size}`],
    classes[`text-decoration-${textDecoration}`],
    className,
  );

  return <Component className={headingClasses} {...elementProps} />;
};

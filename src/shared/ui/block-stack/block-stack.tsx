import type { PropsWithChildren } from 'react';

import { clsx } from 'clsx';

import classes from './block-stack.module.css';

type Element = 'div' | 'ul' | 'ol';

type Gap = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl';

type InlineAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export interface BlockStackProps extends PropsWithChildren {
  size?: 'large' | 'medium' | 'small';
  as: Element;
  gap?: Gap;
  className?: string;
  align?: Align;
  inlineAlign?: InlineAlign;
}

export const BlockStack = (
  {
    as: Component,
    children,
    className,
    gap,
    size = 'medium',
    inlineAlign,
    align,
    ...restProps
  }: BlockStackProps,
) => {
  const blockStackClasses = clsx(
    classes['block-stack'],
    classes[`block-stack-size-${size}`],
    {
      [classes['block-stack-gap']]: gap,
    },
    className,
  );

  const blockStackStyle = {
    '--block-stack-gap': `var(--gap-${gap})`,
    '--block-stack-align': `${align}`,
    '--block-stack-inline-align': `${inlineAlign}`,
  } as React.CSSProperties;

  return (
    <Component
      style={blockStackStyle}
      className={blockStackClasses}
      {...restProps}
    >
      {children}
    </Component>
  );
};

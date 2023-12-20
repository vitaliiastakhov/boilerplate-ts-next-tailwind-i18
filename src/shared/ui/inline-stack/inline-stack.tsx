import type { PropsWithChildren } from 'react';

import { clsx } from 'clsx';

import classes from './inline-stack.module.css';

type Element = 'div' | 'ul' | 'ol';

type Gap = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl';

type BlockAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

type Align =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

interface InlineStackProps extends PropsWithChildren {
  size?: 'large' | 'medium' | 'small';
  as: Element;
  gap?: Gap;
  className?: string;
  wrap?: boolean;
  fullWidth?: boolean;
  align?: Align;
  blockAlign?: BlockAlign;
  grid?: {
    rows?: number;
    columns?: number;
  };
}

export const InlineStack = (
  {
    as: Component,
    children,
    className,
    gap,
    size = 'medium',
    wrap = true,
    blockAlign,
    align,
    grid,
    ...restProps
  }: InlineStackProps,
) => {
  const inlineStackClasses = clsx(
    classes['inline-stack'],
    classes['full-width'],
    classes[`inline-stack-display-${grid ? 'grid' : 'flex'}`],
    classes[`inline-stack-size-${size}`],
    {
      [classes['inline-stack-gap']]: gap,
    },
    className,
  );

  const flexStackStyle = {
    '--inline-stack-gap': gap ? `var(--gap-${gap})` : null,
    '--inline-stack-wrap': wrap ? 'wrap' : 'nowrap',
    '--inline-stack-block-align': blockAlign,
  } as React.CSSProperties;

  const gridStackStyle = grid
    ? {
      '--inline-stack-gap': gap ? `var(--gap-${gap})` : null,
      '--inline-stack-block-align': blockAlign,
      '--inline-stack-columns': grid.columns,
      '--inline-stack-rows': grid.rows,
    } as React.CSSProperties
    : {};

  const inlineStackStyle = { ...flexStackStyle, ...gridStackStyle };

  return (
    <Component
      style={inlineStackStyle}
      className={inlineStackClasses}
      {...restProps}
    >
      {children}
    </Component>
  );
};

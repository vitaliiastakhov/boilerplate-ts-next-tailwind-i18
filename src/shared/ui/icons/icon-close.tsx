import type { IconProps } from './types';

import React from 'react';

const SvgIcon = (
  { color = 'currentColor', size = 14, strokeWidth = 2, ...restProps }:
    IconProps,
  forwardedRef: React.Ref<SVGSVGElement>,
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 24 24'
    ref={forwardedRef}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...restProps}
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M18 6l-12 12' />
    <path d='M6 6l12 12' />
  </svg>
);

const ForwardRef = React.forwardRef(SvgIcon);
ForwardRef.displayName = 'IconClose';

export { ForwardRef as IconClose };

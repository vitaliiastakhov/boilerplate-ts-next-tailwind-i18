import type { IconProps } from './types';

import React from 'react';

const SvgIcon = (
  { color = 'currentColor', size = 14, ...restProps }: IconProps,
  forwardedRef: React.Ref<SVGSVGElement>,
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 24 24'
    ref={forwardedRef}
    {...restProps}
  >
    <path
      d='M21.4448 21.462H17.3672L17.3324 10.031L5.93619 21.2529L2.76477 17.9421L14.1958 6.78988H2.55566L2.59051 2.53809H21.4448V21.462Z'
      fill={color}
    />
  </svg>
);

const ForwardRef = React.forwardRef(SvgIcon);
ForwardRef.displayName = 'IconArrowLeftTop';

export { ForwardRef as IconArrowLeftTop };

import { clsx } from 'clsx';

import classes from './spinner.module.css';

interface SpinnerProps {
  className?: string;
  size: 'extra-small' | 'small' | 'medium' | 'large';
}

export const Spinner = ({ size = 'medium', className }: SpinnerProps) => {
  return (
    <div
      className={clsx(
        classes[`spinner-size-${size}`],
        classes.spinner,
        className,
      )}
    />
  );
};

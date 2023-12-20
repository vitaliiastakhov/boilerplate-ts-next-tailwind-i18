import type { ReactNode } from 'react';

import classes from './form-content.module.css';

interface FormContentProps {
  children: ReactNode;
  className?: string;
}

export const FormContent = ({ children }: FormContentProps) => {
  const formContentClasses = classes['form-content'];

  return (
    <div className={formContentClasses}>
      {children}
    </div>
  );
};

import type { ReactNode } from 'react';

import { Text } from '@/ui/text';

import classes from './form-header.module.css';

interface FormHeaderProps {
  text?: string;
  children?: ReactNode;
}

export const FormHeader = ({ text, children }: FormHeaderProps) => {
  return (
    <div className={classes['form-header']}>
      {children ? children : <Text as='span' size='body-medium'>{text}</Text>}
    </div>
  );
};

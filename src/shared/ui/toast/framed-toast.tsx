import type { ReactNode } from 'react';

import { useEffect, useState } from 'react';

import { createContainer, Portal } from '../portal/portal';
import classes from './framed-toast.module.css';

const TOAST_CONTAINER_ID = 'toast-container-id';
interface FramedToastProps {
  children: ReactNode;
}

export const FramedToast = ({ children }: FramedToastProps) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    createContainer({ id: TOAST_CONTAINER_ID });
    setMounted(true);
  }, []);

  return isMounted
    ? (
      <Portal id={TOAST_CONTAINER_ID}>
        <div className={classes['framed-toast']}>
          {children}
        </div>
      </Portal>
    )
    : null;
};

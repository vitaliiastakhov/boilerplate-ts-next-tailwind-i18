import { useEffect } from 'react';
import { clsx } from 'clsx';

import { useModal } from '../../lib/hooks/use-modal';
import { IconClose } from '../icons/icon-close';
import { Text } from '../text';
import classes from './toast.module.css';

interface ToastProps {
  text: string;
  validationStatus: 'help' | 'success' | 'warning' | 'error';
  className?: string;
  timeout?: number;
}

export const Toast = (
  { text, validationStatus, className, timeout = 5000 }: ToastProps,
) => {
  const {
    modalVisible,
    showModal,
    closeModal,
  } = useModal();

  useEffect(() => {
    showModal();

    setTimeout(() => {
      closeModal();
    }, timeout);

    return () => {
      closeModal();
    };
  }, [closeModal, showModal, timeout]);

  const toastClasses = clsx(
    classes.toast,
    classes[`toast-validation-${validationStatus}`],
    className,
  );

  if (modalVisible) {
    return (
      <div className={toastClasses}>
        <div className={classes['toast-content']}>
          <Text as='span' size='body-small'>
            {text}
          </Text>
        </div>

        <button
          onClick={closeModal}
          type='button'
          className={classes['toast-button']}
        >
          <IconClose size={16} strokeWidth={3} />
        </button>
      </div>
    );
  }

  return null;
};

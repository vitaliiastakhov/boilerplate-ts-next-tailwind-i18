import type { FC, PropsWithChildren, ReactNode } from 'react';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '../button';
import { IconClose } from '../icons/icon-close';
import { createContainer, Portal } from '../portal/portal';
import classes from './modal.module.css';

const MODAL_CONTAINER_ID = 'modal-container-id';

export interface BaseModalProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  header?: FC<PropsWithChildren<ModalHeaderProps>>;
  body?: FC<PropsWithChildren<BaseModalProps>>;
  footer?: FC<PropsWithChildren<BaseModalProps>>;
  footerButtons?: ReactNode;
  onClose: () => void;
}

type ModalHeaderProps = BaseModalProps;

export const ModalDefaultHeader: FC<ModalHeaderProps> = (
  { title, subtitle, onClose },
) => {
  const onCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div className={classes['modal-header']}>
      <div className={classes['modal-header-title-group']}>
        <h1 className={classes['modal-header-title']}>{title}</h1>
        {subtitle && (
          <h2 className={classes['modal-header-subtitle']}>{subtitle}</h2>
        )}
      </div>
      <Button
        type='button'
        size='medium'
        appearance='ghost'
        onClick={onCloseClick}
        iconOnly
        icon={IconClose}
      />
    </div>
  );
};

const ModalDefaultBody: FC<PropsWithChildren<BaseModalProps>> = (
  { children },
) => {
  return <div className={classes['modal-body']}>{children}</div>;
};
const ModalDefaultFooter: FC<PropsWithChildren<BaseModalProps>> = (
  { footerButtons },
) => {
  return footerButtons && (
    <div className={classes['modal-footer']}>{footerButtons}</div>
  );
};

type ModalProps = FC<PropsWithChildren<BaseModalProps>>;

export const Modal: ModalProps = (props) => {
  const { onClose, title, subtitle, header, body, footer } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('click', handleWrapperClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('click', handleWrapperClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [onClose]);

  const defaultedProps = { ...props, title, subtitle };

  const headerMarkup = (header ?? ModalDefaultHeader)(defaultedProps);
  const bodyMarkup = (body ?? ModalDefaultBody)(defaultedProps);
  const renderMarkup = (footer ?? ModalDefaultFooter)(defaultedProps);

  return isMounted
    ? (
      <Portal id={MODAL_CONTAINER_ID}>
        <div className={classes.modal} ref={rootRef}>
          <div className={classes['modal-content']}>
            {headerMarkup}
            {bodyMarkup}
            {renderMarkup}
          </div>
        </div>
      </Portal>
    )
    : null;
};

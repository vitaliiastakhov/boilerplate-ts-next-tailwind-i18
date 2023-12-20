import { useCallback, useState } from 'react';

export interface UseModalReturnType {
  modalVisible: boolean;
  showModal: () => void;
  closeModal: () => void;
}

export interface UseModalProps {
  defaultVisible?: boolean;
}

export const useModal = (
  { defaultVisible = false }: UseModalProps = {},
): UseModalReturnType => {
  const [modalVisible, setVisible] = useState(defaultVisible);

  const showModal = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);

  return {
    modalVisible,
    showModal,
    closeModal,
  };
};

import React from 'react';
import styled from 'styled-components';
import { ToastMessage } from './ToastMessage';

export interface Toast {
  id: string;
  message: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const Container = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <Container>
      {toasts.map(toast => (
        <ToastMessage
          key={toast.id}
          id={toast.id}
          message={toast.message}
          duration={toast.duration}
          onRemove={onRemove}
        />
      ))}
    </Container>
  );
};

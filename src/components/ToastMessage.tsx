import React, { useEffect } from 'react';
import styled from 'styled-components';

interface ToastMessageProps {
  id: string;
  message: string;
  onRemove: (id: string) => void;
  duration?: number;
}

const MessageContainer = styled.div<{ isVisible: boolean }>`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(0.25rem);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  max-width: 20rem;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateX(${props => props.isVisible ? 0 : '1rem'});
  transition: all 0.3s ease-in-out;
`;

export const ToastMessage: React.FC<ToastMessageProps> = ({ 
  id, 
  message, 
  onRemove, 
  duration = 5000 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));

    // Set up removal
    const fadeTimeout = setTimeout(() => {
      setIsVisible(false);
    }, duration - 300); // Start fade out before removal

    const removeTimeout = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, [id, duration, onRemove]);

  return (
    <MessageContainer isVisible={isVisible}>
      {message}
    </MessageContainer>
  );
};

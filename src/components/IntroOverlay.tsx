import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
  z-index: 1000;
`;

const Message = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: white;
  text-align: center;
  transform: translateY(-2rem);

  h1 {
    font-size: 1.75rem;
    font-weight: 400;
  }
`;

const ShortcutKey = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1.25rem;
  margin: 0 0.25rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.7;
  margin-top: 0.75rem;
  font-weight: 300;
`;

interface IntroOverlayProps {
  onDismiss: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only prevent dismissal if we're holding shift without space
      if (e.shiftKey && e.code !== 'Space') {
        return;
      }
      
      e.preventDefault(); // Prevent space from scrolling
      setIsVisible(false);
      setTimeout(onDismiss, 500);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  return (
    <Overlay isVisible={isVisible}>
      <Message>
        <h1>Press <ShortcutKey>⇧ shift</ShortcutKey>+<ShortcutKey>space</ShortcutKey> to begin</h1>
        <Subtitle>Press any key to dismiss</Subtitle>
      </Message>
    </Overlay>
  );
};

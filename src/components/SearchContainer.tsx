import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const Container = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%) translateY(${props => props.isVisible ? 0 : '2rem'});
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
  filter: blur(${props => props.isVisible ? 0 : '8px'});
  transform-origin: bottom center;
  scale: ${props => props.isVisible ? 1 : 0.95};
`;

export const SearchContainer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Shift + Space
      if (e.shiftKey && e.code === 'Space') {
        e.preventDefault(); // Prevent space from scrolling
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Container isVisible={isVisible}>
      <SearchBar />
    </Container>
  );
};

import React, { useState, KeyboardEvent, MouseEvent } from 'react';
import styled from 'styled-components';

// Container that positions the search bar at the bottom of the viewport
const SearchContainer = styled.div<{ isFocused: boolean }>`
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  transition: all 0.5s ease;
`;

// Main search input component with hover and focus animations
const SearchInput = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  background-color: rgba(64, 65, 79, 0.9);
  border-radius: 0.75rem;
  padding: 0.625rem 1.25rem;
  width: ${props => props.isFocused ? "37.5rem" : "18.75rem"};  // Expands on focus
  height: 3rem;
  backdrop-filter: blur(0.5rem);
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.15);
  transition: all 0.5s ease;
  cursor: text;

  &:hover {
    transform: scale(1.05);  // Subtle zoom effect on hover
    background-color: rgba(64, 65, 79, 0.95);
  }

  input {
    flex: 1;
    border: none;
    background: none;
    color: #ffffff;
    font-size: 1.25rem;
    outline: none;
    width: 100%;
    
    &::placeholder {
      color: #8e8ea0;
    }
  }
`;

// Arrow icon that appears on the right side of the input
const UpArrowIcon = styled.div<{ isFocused: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8ea0;
  margin-left: 0.5rem;
  opacity: ${props => props.isFocused ? "1" : "0.7"};
  transition: opacity 0.2s ease;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

// Mic button
const MicButton = styled.button<{ isFocused: boolean }>`
  background: none;
  border: none;
  color: #8e8ea0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  opacity: ${props => props.isFocused ? "1" : "0.7"};
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    transform: scale(1.1);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

// Tooltip for mic button
const Tooltip = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: -2.5rem;
  right: 0;
  background: rgba(32, 33, 35, 0.9);
  backdrop-filter: blur(0.5rem);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #ffffff;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '0.5rem'});
  transition: all 0.2s ease;
  pointer-events: none;
  white-space: nowrap;
`;

interface SearchBarProps {
  /** Callback function triggered when Enter key is pressed */
  onEnter?: (value: string) => void;
  /** Placeholder text for the input field */
  placeholder?: string;
}

/**
 * A floating search bar component that expands on focus and maintains expansion while interacting.
 * Features smooth animations, hover effects, and Enter key handling.
 */
const SearchBar: React.FC<SearchBarProps> = ({ 
  onEnter, 
  placeholder = "Ask ChatGPT" 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mouseDownOnBar, setMouseDownOnBar] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Handle Enter key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.repeat && onEnter) {
      onEnter(inputValue);
    }
  };

  // Prevent focus loss when clicking within the focused bar
  const handleMouseDown = (e: MouseEvent) => {
    if (isFocused) {
      setMouseDownOnBar(true);
      e.preventDefault();
    }
  };

  // Handle focus loss, allowing the bar to stay expanded when clicking within it
  const handleBlur = () => {
    if (!mouseDownOnBar) {
      setIsFocused(false);
    }
    setMouseDownOnBar(false);
  };

  // Handle mic button click
  const handleMicClick = () => {
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <SearchContainer isFocused={isFocused}>
      <SearchInput 
        isFocused={isFocused}
        onMouseDown={handleMouseDown}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
        <UpArrowIcon isFocused={isFocused}>
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </UpArrowIcon>
        <MicButton 
          isFocused={isFocused}
          onClick={handleMicClick}
          aria-label="Start dictation"
        >
          <Tooltip isVisible={showTooltip}>
            Press {/Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'Fn twice' : 'Win+H'} to dictate
          </Tooltip>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </MicButton>
      </SearchInput>
    </SearchContainer>
  );
};

export default SearchBar;

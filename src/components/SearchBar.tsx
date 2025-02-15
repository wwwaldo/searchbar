import React, { useState, KeyboardEvent, MouseEvent, useEffect } from 'react';
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
  border-radius: 1.5rem;
  padding: 0.625rem 0.75rem;
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
    padding: 0 0.75rem;
    
    &::placeholder {
      color: #8e8ea0;
    }
  }
`;

const UpArrowIcon = styled.div<{ isFocused: boolean }>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8ea0;
  opacity: ${props => props.isFocused ? "1" : "0.7"};
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }
`;

interface SearchBarProps {
  /** Callback function triggered when Enter key is pressed */
  onEnter?: (value: string) => void;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Whether to automatically focus the input */
  shouldFocus?: boolean;
}

/**
 * A floating search bar component that expands on focus and maintains expansion while interacting.
 * Features smooth animations, hover effects, and Enter key handling.
 */
const SearchBar: React.FC<SearchBarProps> = ({ 
  onEnter, 
  placeholder = "Type to search...",
  shouldFocus = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mouseDownOnBar, setMouseDownOnBar] = useState(false);

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

  // Focus input when shouldFocus becomes true
  useEffect(() => {
    if (shouldFocus) {
      const input = document.querySelector<HTMLInputElement>('.search-input');
      input?.focus();
    }
  }, [shouldFocus]);

  return (
    <SearchContainer isFocused={isFocused}>
      <SearchInput 
        isFocused={isFocused}
        onMouseDown={handleMouseDown}
      >
        <input
          className="search-input"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          autoFocus={shouldFocus}
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
      </SearchInput>
    </SearchContainer>
  );
};

export default SearchBar;

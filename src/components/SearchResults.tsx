import React from 'react';
import styled from 'styled-components';

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  metadata?: {
    [key: string]: string | number;
  };
}

interface SearchResultsProps {
  results: SearchResult[];
  isVisible: boolean;
  selectedIndex?: number;
  onResultClick?: (result: SearchResult) => void;
  maxHeight?: string;
}

const ResultsContainer = styled.div<{ isVisible: boolean; maxHeight?: string }>`
  position: absolute;
  bottom: calc(100% + 8px); // Position above search bar with 8px gap
  left: 0;
  right: 0;
  background: rgba(32, 33, 35, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 8px 0;
  max-height: ${props => props.maxHeight || '60vh'};
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '8px'});
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};

  /* Smooth scrolling */
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const ResultItem = styled.div<{ isSelected: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${props => props.isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ResultIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8ea0;
`;

const ResultContent = styled.div`
  flex: 1;
`;

const ResultTitle = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  margin-bottom: 2px;
`;

const ResultDescription = styled.div`
  color: #8e8ea0;
  font-size: 0.8rem;
`;

const EmptyState = styled.div`
  padding: 16px;
  text-align: center;
  color: #8e8ea0;
  font-size: 0.9rem;
`;

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isVisible,
  selectedIndex = -1,
  onResultClick,
  maxHeight,
}) => {
  if (!isVisible) return null;

  return (
    <ResultsContainer isVisible={isVisible} maxHeight={maxHeight}>
      {results.length > 0 ? (
        results.map((result, index) => (
          <ResultItem
            key={result.id}
            isSelected={index === selectedIndex}
            onClick={() => onResultClick?.(result)}
          >
            {result.icon && (
              <ResultIcon>
                {/* You can replace this with an actual icon component */}
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L1 21h22L12 2zm0 3.83L19.13 19H4.87L12 5.83z"/>
                </svg>
              </ResultIcon>
            )}
            <ResultContent>
              <ResultTitle>{result.title}</ResultTitle>
              {result.description && (
                <ResultDescription>{result.description}</ResultDescription>
              )}
            </ResultContent>
          </ResultItem>
        ))
      ) : (
        <EmptyState>No results found</EmptyState>
      )}
    </ResultsContainer>
  );
};

export default SearchResults;

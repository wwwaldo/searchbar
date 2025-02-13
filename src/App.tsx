import React from 'react';
import SearchBar from './components/SearchBar';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  color: white;
  padding: 1.25rem;
`;

const App: React.FC = () => {
  const handleSearch = (value: string) => {
    console.log('Message:', value);
  };

  return (
    <AppContainer>
      <h1>Floating SearchBar Demo</h1>
      <p>The search bar will float at the bottom of the screen.</p>
      <SearchBar onEnter={handleSearch} placeholder="Type a message and press Enter..." />
    </AppContainer>
  );
};

export default App;

import React, { useState } from 'react';
import { SearchContainer } from './components/SearchContainer';
import { IntroOverlay } from './components/IntroOverlay';
import styled from 'styled-components';

const ZenMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
  user-select: none;
  pointer-events: none;

  h1 {
    font-size: 3rem;
    font-weight: 200;
    margin: 0;
  }

  p {
    font-size: 1.25rem;
    opacity: 0.7;
    margin-top: 1rem;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: #000;
`;

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <AppContainer>
      {showIntro && <IntroOverlay onDismiss={() => setShowIntro(false)} />}
      <ZenMessage>
        <h1>🧘‍♂️ breathe</h1>
        <p>the search will come to you</p>
      </ZenMessage>
      <SearchContainer />
    </AppContainer>
  );
}

export default App;

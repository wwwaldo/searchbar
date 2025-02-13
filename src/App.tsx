import React, { useState } from 'react';
import { SearchContainer } from './components/SearchContainer';
import { IntroOverlay } from './components/IntroOverlay';
import styled from 'styled-components';

const ZenMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
  user-select: none;
  pointer-events: none;

  h1 {
    font-size: 4rem;
    font-weight: 200;
    margin: 0;
    letter-spacing: 0.1em;
  }

  p {
    font-size: 1.5rem;
    opacity: 0.8;
    margin-top: 1.5rem;
    font-weight: 300;
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

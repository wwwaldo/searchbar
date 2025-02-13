import React, { useState } from 'react';
import { SearchContainer } from './components/SearchContainer';
import { IntroOverlay } from './components/IntroOverlay';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="App">
      {showIntro && <IntroOverlay onDismiss={() => setShowIntro(false)} />}
      <SearchContainer />
    </div>
  );
}

export default App;

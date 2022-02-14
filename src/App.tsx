import React, { useState } from 'react';
import Basic from './example/basic';
import { ReactQueryDevtools } from 'react-query/devtools'
import InvalidateQuery from './example/invalidateQuery';
import Hook from './example/hook';

type Tabs = 'basic' | 'hook' | 'invalidateQuery';

function App() {
  const [ tabStatus, setTabStatus ] = useState<Tabs>('basic');

  const makeExample = (tabStatus: Tabs) => {
    switch (tabStatus) {
      case 'basic':
        return <Basic />;
      case 'hook':
        return <Hook />;
      case 'invalidateQuery':
        return <InvalidateQuery />;
      default:
        return <Basic />;
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => setTabStatus('basic')}>basic</button>
        <button onClick={() => setTabStatus('hook')}>hook</button>
        <button onClick={() => setTabStatus('invalidateQuery')}>invalidateQuery</button>
      </div>
      {makeExample(tabStatus)}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;

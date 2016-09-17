import React from 'react';
// import { version } from '../../package.json';

const App = ({ children }) => (
  <main>
    {children || '404'}
  </main>
);

App.propTypes = { children: React.PropTypes.object };

export default App;

import React from 'react';
// import { version } from '../../package.json';

const App = ({ children }) => (
  <div>
    {children || '404'}
  </div>
);

App.propTypes = { children: React.PropTypes.object };

export default App;

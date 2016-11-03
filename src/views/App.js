import React from 'react';

const App = ({ children }) => (
  <div>
    {children || '404'}
  </div>
);

App.propTypes = { children: React.PropTypes.object };

export default App;

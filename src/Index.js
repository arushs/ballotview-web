import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './views/App';
import BallotViewLanding from './views/BallotViewLanding';
import RockTheVoteLanding from './views/RockTheVoteLanding';
import BallotView from './views/BallotView';

window.React = React;

render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BallotViewLanding} />
      <Route path="rockthevote" component={RockTheVoteLanding} />
      <Route path="app" component={BallotView} />
    </Route>
  </Router>),
  document.getElementById('app')
);

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './views/App';
import Landing from './views/Landing';
import BallotView from './views/BallotView';

window.React = React;

const BallotViewLanding = () => (<Landing view={2} />);
const RockTheVoteLanding = () => (<Landing view={1} />);

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

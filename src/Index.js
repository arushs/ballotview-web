import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './views/App';
import Landing from './views/Landing';

window.React = React;

const BallotView = () => (<Landing view={2} />);
const RockTheVote = () => (<Landing view={1} />);

render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BallotView} />
      <Route path="rockthevote" component={RockTheVote} />
    </Route>
  </Router>),
  document.getElementById('app')
);

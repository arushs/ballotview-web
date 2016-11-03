import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './views/App';

import LandingMain from './views/BVLandingMain';
import LandingRockTheVote from './views/BVLandingRockTheVote';

import Ballot from './views/BVBallot';
import Receipt from './views/BVReceipt';

var ReactGA = require('react-ga');
ReactGA.initialize('UA-49663930-2');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

window.React = React;

render(
  (<Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingMain} />
      <Route path="rockthevote" component={LandingRockTheVote} />
      <Route path="ballot">
        <Route path="/ballot/:bvId" component={Ballot} />
        <Route path="/receipt/:bvId" component={Receipt} />
      </Route>
    </Route>
  </Router>),
  document.getElementById('app')
);

// enable :active
document.addEventListener("touchstart", function(){}, true);

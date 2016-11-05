import React from 'react';
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


export default () => (<Router history={browserHistory} onUpdate={logPageView}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingMain} />
      <Route path="rockthevote" component={LandingRockTheVote} />
      <Route path="ballot">
        <Route path="/ballot/:bvId" component={Ballot} />
        <Route path="/receipt/:bvId" component={Receipt} />
        {/* <Route path="/create/:preset" component={Create} /> */}
      </Route>
    </Route>
  </Router>);

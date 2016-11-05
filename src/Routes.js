import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './views/App';

import LandingMain from './views/BVLandingMain';
import LandingRockTheVote from './views/BVLandingRockTheVote';

import Ballot from './views/BVBallot';
import Receipt from './views/BVReceipt';
import Create from './views/BVCreate';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Create} />
    <Route path="/:preset" component={Create} />
    <Route path="rockthevote" component={LandingRockTheVote} />
    <Route path="ballot">
      <Route path="/ballot/:bvId" component={Ballot} />
      <Route path="/receipt/:bvId" component={Receipt} />
    </Route>
  </Route>
);

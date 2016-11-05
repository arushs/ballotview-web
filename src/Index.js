import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import routes from './Routes';

// console.log(Routes);

window.React = React;

var ReactGA = require('react-ga');
ReactGA.initialize('UA-49663930-2');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

render(<Router history={browserHistory} onUpdate={logPageView}>{routes}</Router>
, document.getElementById('app'));

// enable :active
document.addEventListener("touchstart", function(){}, true);

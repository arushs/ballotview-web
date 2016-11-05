import React from 'react';
import { render } from 'react-dom';
import Routes from './Routes';

// console.log(Routes);

window.React = React;

render((<Routes />), document.getElementById('app'));

// enable :active
document.addEventListener("touchstart", function(){}, true);

import React, { Component } from 'react';

import EnterAddress from './EnterAddress';

const content = {
  message: 'Voting should be easy',
  blurb: 'Access detailed, nonpartisan ballot content about each candidate and issue so that you know what you\'re voting for',
  prompt: 'Enter your full address below to get started:',
  prompt2: '(We\'ll match you to the right ballot.)'
};

const MainSection = (props) => (
  <section id="main">
    <div id="logo">
      <div className="logo_img"><img src="/dist/images/ballotview-black.png" /></div>
      <div className="title">BallotView</div>
    </div>
    <div id="right_feature">
      <div><span>a <a href="http://futurethon.org/">Futurethon</a> project.</span></div>
    </div>
    <div id="blurb">
      <div className="large"><span>{content.message}</span></div>
      <div><span>{content.blurb}</span></div>
    </div>
    <div id="access_ballot">
      <div className="title"><span><b>{content.prompt}</b></span></div>
      <EnterAddress />
      {/*<div className="sub"><span>{content.prompt2}</span></div>*/}
    </div>
    <div id="down_arrow">
      <img src="/dist/images/noun_149006_cc.png" />
    </div>
  </section>
);

export default MainSection;

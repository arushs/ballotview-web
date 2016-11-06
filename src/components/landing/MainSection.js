import React, { Component } from 'react';

import EnterAddress from './EnterAddress';

const MainSection = ({ content, children }) => (
  <section id="main">
    <div id="logo">
      <div className="logo_img"><img src="/dist/images/ballotview-black.png" /></div>
      <div className="title">BallotView</div>
    </div>
    <div id="right_feature">
      <div><span>a <a href="http://futurethon.org/">Futurethon</a> project.</span></div>
    </div>

    {children}

    <div id="blurb">
      <div className="large" style={{ color: content.color || null }}><span>{content.message}</span></div>
      <div><span>{content.blurb}</span></div>
    </div>
    <div id="access_ballot">
      <div className="title"><span><b>{content.prompt}</b></span></div>
      <EnterAddress prefill={content.keyword} />
      {/*<div className="sub"><span>{content.prompt2}</span></div>*/}
    </div>
    <div id="mobile_disclaimer">
      Hey, we see you're on mobile. For the best experience, please try BallotView on a computer.
    </div>
    <div id="down_arrow">
      <img src="/dist/images/noun_149006_cc.png" />
    </div>
  </section>
);

export default MainSection;

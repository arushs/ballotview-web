import React from 'react';

const content = {
  title: 'BallotView',
  subtitle: 'Voting made easy',
  message: 'Inspect the ballot',
  blurb: 'Access detailed, non-partisan ballot content before the election ' +
  'so that you can vote easy.',
  exampleEmail: 'youremail@domain.ext'
};

const MainSection = ({ email, emailIsValid, onUpdateEmail, onSubmitEmail }) => (
  <section id="main">
    <div id="logo">
      <div className="title"><span>{content.title}</span></div>
      <div className="sub"><span>{content.subtitle}</span></div>
    </div>
    <div id="blurb">
      <div className="large"><span>{content.message}</span></div>
      <div><span>{content.blurb}</span></div>
      <div><span className="coming_soon">Coming in October</span></div>
    </div>
    <div id="email_collect">
      <span>Get notified when BallotView is ready for you</span>
      <input
        type="text"
        placeholder={content.exampleEmail}
        value={email}
        onChange={onUpdateEmail}
      />
      <button
        disabled={!emailIsValid}
        onClick={onSubmitEmail}
      >Notify Me</button>
      {/* <div><a>Why do we need your address?</a></div>*/}
    </div>
    <div id="down_arrow">
      <img src="/dist/images/noun_149006_cc.png" atr="" />
    </div>
  </section>
);

MainSection.propTypes = {
  email: React.PropTypes.string,
  emailIsValid: React.PropTypes.bool,
  onUpdateEmail: React.PropTypes.func,
  onSubmitEmail: React.PropTypes.func
};

export default MainSection;

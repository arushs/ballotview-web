import React from 'react';

import BallotCard from '../ballot/BallotCard';

const content = {
  title: 'Ballotview',
  subtitle: 'Voting made easy.',
  blurb: 'Ballotview provides an intuitive, clear platform for voters to access detailed, ' +
  'non-partisan ballot content before an election. Our goal is to provide an easy experience ' +
  'for voters to learn about candidates and measures, record preferences, ' +
  'and be better engaged with the voting process.',
  exampleEmail: 'youremail@domain.ext'
};

const MainSection = ({ email, emailIsValid, onUpdateEmail, onSubmitEmail }) => (
  <section id="main">
    <div id="logo_wrap">
      <span id="logo">{content.title}</span>
      <span>{content.subtitle}</span>
    </div>
    <div id="blurb">
      <span>{content.blurb}</span>
      <div><span id="coming_soon">Coming in October</span></div>
    </div>
    <div id="email_collect">
      <span>Get notified when Ballotview is ready for you</span>
      <input
        type="text"
        placeholder={content.exampleEmail}
        value={email}
        onChange={onUpdateEmail}
      />
      <button disabled={!emailIsValid} onClick={onSubmitEmail}>Notify Me</button>
      {/* <div><a>Why do we need your address?</a></div>*/}
    </div>
    <BallotCard />
  </section>
);

MainSection.propTypes = {
  email: React.PropTypes.string,
  emailIsValid: React.PropTypes.bool,
  onUpdateEmail: React.PropTypes.func,
  onSubmitEmail: React.PropTypes.func
};

export default MainSection;

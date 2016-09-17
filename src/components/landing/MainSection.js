import React from 'react';

const content = {
  title: 'Ballotview',
  subtitle: 'Voting made easy.',
  blurb: 'Ballotview provides an intuitive, clear platform for voters to access detailed, non-partisan ballot content before an election. Our goal is to provide an easy experience for voters to learn about candidates and measures, record preferences, and be better engaged with the voting process.',
  exampleEmail: 'youremail@domain.ext'
};

const MainSection = ({ email, emailIsValid, onUpdateEmail }) => (
  <section id="main">
    <div id="logo_wrap">
      <span id="logo">{content.title}</span>
      <span>{content.subtitle}</span>
    </div>
    <div id="blurb">
      <span>{content.blurb}</span>
    </div>
    <div id="email_collect">
      <input
        type="text"
        placeholder={content.exampleEmail}
        value={email}
        onChange={onUpdateEmail}
      />
      <button disabled={!emailIsValid}>Submit</button>
      <a>Why do we need your address?</a>
    </div>
  </section>
);

MainSection.propTypes = {
  email: React.PropTypes.string,
  emailIsValid: React.PropTypes.bool,
  onUpdateEmail: React.PropTypes.func
};

export default MainSection;

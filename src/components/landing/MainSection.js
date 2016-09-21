import React from 'react';

const content = {
  message: 'Inspect the ballot',
  blurb: 'Access detailed, non-partisan ballot content before the election ' +
  'so that you can vote easy.',
  exampleEmail: 'youremail@domain.ext'
};

const MainSection = ({ email, emailIsValid, onUpdateEmail, onSubmitEmail }) => (
  <section id="main">
    <div id="logo">
      <div className="logo_img"><img src="/dist/images/ivoted.png" /></div>
      <div className="title"><span className="blue">Ballot</span><span className="red">View</span></div>
      <div className="sub"><span>Voting made easy</span></div>
    </div>
    <div id="right_feature">
      <div><span>a <a href="http://futurethon.org/">Futurethon</a> project.</span></div>
    </div>
    <div id="blurb">
      <div className="large"><span>{content.message}</span></div>
      <div><span>{content.blurb}</span></div>
      <div className="coming_soon"><span>Coming in October</span></div>
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
      <img src="/dist/images/noun_149006_cc.png" />
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

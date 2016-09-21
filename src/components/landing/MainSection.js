import React, { Component } from 'react';

const content = {
  message: 'Inspect your ballot',
  blurb: 'Access detailed, non-partisan ballot content before the election ' +
  'so that you can vote easy.',
  exampleEmail: 'youremail@domain.ext'
};


class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      state: '',
      emailIsValid: false
    };
    this.onUpdateEmail = this.onUpdateEmail.bind(this);
    this.onUpdateState = this.onUpdateState.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
  }

  onUpdateEmail(e) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.setState({
      email: e.target.value,
      emailIsValid: re.test(e.target.value)
    });
  }

  onUpdateState(e) {
    this.setState({
      state: e.target.value
    });
  }

  onSubmitEmail() {
    if (this.state.email_is_valid) {
      api.submitEmail(this.state.email).then((data) => { console.log(data); }).catch(() => {});
    }
  }

  render() {
    let { email, state, emailIsValid } = this.state;
    let onUpdateEmail = this.onUpdateEmail;
    let onUpdateState = this.onUpdateState;
    let onSubmitEmail = this.onSubmitEmail;

    return (
      <section id="main">
        <div id="logo">
          <div className="logo_img"><img src="/dist/images/ivoted.png" /></div>
          <div className="title">BallotView</div>
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
            className="email"
            placeholder={content.exampleEmail}
            value={email}
            onChange={onUpdateEmail}
          />
          <input
            type="text"
            className="state"
            placeholder="State"
            value={state}
            onChange={onUpdateState}
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
  }
}

export default MainSection;

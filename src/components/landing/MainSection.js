import React, { Component } from 'react';
import api from '../../api-interface';

const content = {
  message: 'Voting should be easy',
  blurb: 'Access detailed, non-partisan ballot content before the election so that you can get informed and vote for what you believe in.',
  exampleAddress: 'University of Southern California, Los Angeles 90007'
};


class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      addressIsValid: false,
      isCreating: false,
    };
    this.onUpdateAddress = this.onUpdateAddress.bind(this);
    this.onCheckSubmit = this.onCheckSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUpdateAddress(e) {

    this.setState({
      address: e.target.value,
      addressIsValid: (e.target.value.length > 0)
    });
  }

  onCheckSubmit(e) {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSubmit() {
    let _this = this;
    if (this.state.addressIsValid && !this.state.isCreating) {
      this.setState({ isCreating: true });

      this.context.router.push('/app');

      // api.submitEmail(this.state.email).then((data) => {
      //   _this.setState({
      //     email: '',
      //     state: '',
      //     emailIsValid: false,
      //     sending: false,
      //     sent: this.state.email
      //   });
      // }).catch(() => {});
    }
  }

  render() {
    let { address, addressIsValid, isCreating } = this.state;
    let { onUpdateAddress, onCheckSubmit, onSubmit } = this;

    return (
      <section id="main">
        <div id="logo">
          <div className="logo_img"><img src="/dist/images/ballotview-black.png" /></div>
          <div className="title">BallotView</div>
          <div className="sub"><span>Voting made easy</span></div>
        </div>
        <div id="right_feature">
          <div><span>a <a href="http://futurethon.org/">Futurethon</a> project.</span></div>
        </div>
        <div id="blurb">
          <div className="large"><span>{content.message}</span></div>
          <div><span>{content.blurb}</span></div>
          {/*<div className="coming_soon"><span>Coming in October</span></div>*/}
        </div>
        <div id="email_collect">
          {/*<div className="title"><span>Get notified when BallotView is ready for you</span></div>*/}
          <div><input
            type="text"
            className="address"
            placeholder={content.exampleAddress}
            value={address}
            onChange={onUpdateAddress}
            onKeyDown={onCheckSubmit}
            disabled={isCreating}
          /></div>
          <div><button
            disabled={!addressIsValid || isCreating}
            onClick={onSubmit}
          >{(!isCreating) ? 'Access Ballot' : 'Accessing...'}</button></div>
        </div>
        <div id="down_arrow">
          <img src="/dist/images/noun_149006_cc.png" />
        </div>
      </section>
    );
  }
}

MainSection.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MainSection;

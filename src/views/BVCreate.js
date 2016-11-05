import React, { Component } from 'react';

import MainSection from '../components/landing/MainSection';
import DetailSection from '../components/landing/DetailSection';
import FooterSection from '../components/landing/FooterSection';
import BallotCard from '../components/ballot/BallotCard';
import _ from 'lodash';

const prefill = {
  Clinton: {
    color: '#0D47A1',
    name: 'Hillary Clinton',
    trail: ['Democratic'],
    info: [{
      sub: ['for President'],
      title: ['Hillary Clinton']
    }, {
      sub: ['for Vice President'],
      title: ['Tim Kaine']
    }]
  },
  Trump: {
    color: '#B71C1C',
    name: 'Donald Trump',
    trail: ['Republican'],
    info: [{
      sub: ['for President'],
      title: ['Donald Trump']
    }, {
      sub: ['for Vice President'],
      title: ['Mike Pence']
    }]
  }
};

const content_default = {
  message: 'Voting should be easy',
  blurb: 'Access detailed, nonpartisan ballot content about each candidate and issue so that you know what you\'re voting for',
  prompt: 'Enter your full address below to get started:',
  prompt2: '(We\'ll match you to the right ballot.)'
};

class BVCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pf: null
    };

    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillMount() {

    if (this.props.params.preset in prefill) {
      this.setState({ pf: this.props.params.preset });
    }

  }

  onUpdate(i, j, t) {

    let cand = Object.keys(prefill)[t.indexOf(true)] || '';


    this.setState({ pf: cand });

    this.context.router.push({ pathname: '/' + cand });
  }

  render() {

    let content = Object.assign({}, content_default);

    if (this.state.pf) {
      Object.assign(content, {
        message: 'Voting for ' + prefill[this.state.pf].name + '?',
        color: prefill[this.state.pf].color,
        keyword: this.state.pf,
        blurb: 'But wait, there\'s more: ' + content.blurb,
      });
    } else {
      content = content_default;
    }

    return (
      <main id="landing">

        <MainSection content={content}>
          <BallotCard
            title={['President And Vice President']}
            tally={_.toArray(prefill).map((o, i) => (Object.keys(prefill).indexOf(this.state.pf) === i))}
            forcePoll={true}
            onUpdate={this.onUpdate}
            poll={_.toArray(prefill)}>
            <div className="tiny">These are major party candidates. Find more presidential candidates based on your location.</div>
          </BallotCard>
        </MainSection>
        <DetailSection />
        <FooterSection />

      </main>
    );

  }

}

BVCreate.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BVCreate;

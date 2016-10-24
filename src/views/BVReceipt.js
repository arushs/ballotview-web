import React, { Component } from 'react';
import request from 'request';

import api from '../api-interface';

import Ballot from '../components/ballot/BallotReceipt';
// import Inspector from '../components/inspector/Inspector';
// import InspectorNav from '../components/inspector/InspectorNav';

import ballots from '../components/ballot/examples/sample_data';
// const tallies = ballots.ballot.map((ballot) => ballot.cards.map((card) => card.poll.map((option) => (false))));

class BVReceipt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: ballots.heading,
      ballot: [],
      tallies: [],
      read_id: null
    };
  }

  componentWillMount() {
    let _this = this;

    api.getReadOnlyBallot(this.props.params.bvId)
      .then(function (data) {
        if ('error' in data || data.statusCode !== 200) {
          console.log('error');
        } else {
          _this.setState(data.body);
          console.log(data.body);
        }
      });
  }

  render() {
    return (
      <main id="ballotview">
        <section id="toolbar">
          <div id="logo">
            <div className="logo_img"><img src="/dist/images/ballotview-black.png" /></div>
            <div className="title">BallotView</div>
          </div>
          <div id="saveActions">
            <span>Read-Only Mode</span>
            <button>Create New Ballot</button>
            <button>Share</button>
          </div>
        </section>
        <section id="ballot_receipt">
          <Ballot
            heading={this.state.heading}
            ballots={this.state.ballot}
            tallies={this.state.tallies}
            onUpdate={() => {}}
            selectedBallot={this.state.selectedBallot}
            onSelectBallot={this.onSelectBallot}
          />
        </section>
      </main>
    );
  }
}

BVReceipt.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BVReceipt;

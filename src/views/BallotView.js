import React, { Component } from 'react';

import Ballot from '../components/ballot/Ballot';
import Inspector from '../components/inspector/Inspector';
import InspectorNav from '../components/inspector/InspectorNav';

import ballots from '../components/ballot/examples/sample_data';
const tallies = ballots.ballot.map((ballot) => ballot.cards.map((card) => card.poll.map((option) => (false))));

class BallotView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: ballots.heading,
      ballots: ballots.ballot,
      tallies: tallies
    };

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(ballotIndex, cardIndex, newTally) {
    let tallies = this.state.tallies;
    tallies[ballotIndex] = tallies[ballotIndex].map((tally, i) => ((i === cardIndex) ? newTally : tally));
    this.setState({ tallies });
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
            <span>Edit Mode</span>
            <button>Save Ballot</button>
            <button>Share</button>
          </div>
        </section>
        <section id="ballot">
          <Ballot
            heading={this.state.heading}
            ballots={this.state.ballots}
            tallies={this.state.tallies}
            onUpdate={this.onUpdate}
          />
        </section>
        <section id="inspector_nav">
          <InspectorNav ballots={ballots.ballot} />
        </section>
        <section id="inspector">
          <Inspector />
        </section>
      </main>
    );
  }
}

export default BallotView;

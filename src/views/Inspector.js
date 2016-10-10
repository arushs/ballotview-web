import React, { Component } from 'react';
import Ballot from '../components/ballot/Ballot';
import BallotClickableText from '../components/ballot/BallotClickableText';

import ballots from '../components/ballot/examples/sample_data';
const tallies = ballots.ballot.map((ballot) => ballot.cards.map((card) => card.poll.map((option) => (false))));

const InspectorNav = ({ ballots }) => (
  <ul className="nav">
    {ballots.map((ballot, ballotIndex) => (
      <li key={ballotIndex}>
        <a>{ballot.title}</a>
        <ul>
          {ballot.cards.map((card, cardIndex) => (
            <li key={cardIndex}>
              <a><BallotClickableText text={[card.title]} /></a>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

class Inspector extends Component {
  constructor(props) {
    super(props);

    this.state = {

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
      <main id="application">
        <section id="ballot">
          <Ballot
            heading={ballots.heading}
            ballots={ballots.ballot}
            tallies={tallies}
            onUpdate={this.onUpdate}
            />
          <InspectorNav ballots={ballots.ballot} />
        </section>
        <section id="inspector">
          <section className="heading">
          something
          </section>
          <section className="content">
          something
          </section>
        </section>
      </main>
    );
  }
}

export default Inspector;

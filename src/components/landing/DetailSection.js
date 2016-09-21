import React, { Component } from 'react';

import BallotHeading from '../ballot/BallotHeading';
import BallotCard from '../ballot/BallotCard';
import sampleData from '../ballot/examples/sample_data';

const tallies = sampleData.map((ballot) => {
  return ballot.poll.map((option) => {
    return false;
  });
});

class DetailSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ballots: sampleData,
      tallies: tallies
    };
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(index, newTally) {
    this.setState({
      tallies: this.state.tallies.map((tally, i) => ((i === index) ? newTally : tally))
    });
  }

  render() {
    return (
      <section id="detail">
      <BallotHeading
        title="Consolidated General Election"
        secondary="LOS ANGELES, CALIFORNIA"
        sub="Nov 8, 2016"
      />
      {this.state.ballots.map((ballot, i) => (
        <BallotCard
          key={i}
          id={i}
          title={ballot.title}
          secondary={ballot.secondary}
          poll={ballot.poll}
          tally={this.state.tallies[i]}
          onUpdate={this.onUpdate}
          click={() => {}}
        />
      ))}
      </section>
    );
  }
}
export default DetailSection;

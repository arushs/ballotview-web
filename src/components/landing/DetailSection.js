import React, { Component } from 'react';

import BallotTranslateSwitch from '../ballot/BallotTranslateSwitch';
import Ballot from '../ballot/Ballot';

import sampleData from '../ballot/examples/sample_data';
import sampleDataEs from '../ballot/examples/sample_data_es';

const tallies = sampleData.ballot.map((ballot) => ballot.cards.map((card) => card.poll.map((option) => (false))));

class DetailSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: sampleData.heading,
      headingEs: sampleDataEs.heading,
      ballots: sampleData.ballot,
      ballotsEs: sampleDataEs.ballot,
      tallies: tallies,
      es: false
    };
    this.onUpdate = this.onUpdate.bind(this);
    this.onSwitchTranslate = this.onSwitchTranslate.bind(this);
  }

  onUpdate(ballotIndex, cardIndex, newTally) {
    let tallies = this.state.tallies;
    tallies[ballotIndex] = tallies[ballotIndex].map((tally, i) => ((i === cardIndex) ? newTally : tally));
    this.setState({ tallies });
  }

  onSwitchTranslate(es) {
    this.setState({ es });
  }

  render() {

    let { es, tallies } = this.state;
    let heading = (!es) ? this.state.heading : this.state.headingEs;
    let ballots = (!es) ? this.state.ballots : this.state.ballotsEs;

    return (
      <section id="detail">
        <section id="left">
          <BallotTranslateSwitch es={es} translate={this.onSwitchTranslate} />
          <Ballot
            heading={heading}
            ballots={ballots}
            tallies={tallies}
            onUpdate={this.onUpdate}
            />
        </section>
        <section id="right">
          <section className="detail_module">
            <div className="title"><span>1. View your local ballot</span></div>
            <div className="desc"><span>
              Access a sample of the ballot you'll see on election day.
              Enter the home address linked to your voter registration to bring up your specific ballot.
            </span></div>
          </section>
          <section className="detail_module">
            <div className="title"><span>2. Inspect the details of candidates and measures</span></div>
            <div className="desc"><span>
              Getting informed on ballot content has never been easier.
              Simply click on candidates, measures, or titles to access detailed, nonpartisan information to help you make your decisions.
            </span></div>
          </section>
          <section className="detail_module">
            <div className="title"><span>3. Record your preferences</span></div>
            <div className="desc"><span>
              Select your preferences and send yourself a receipt via email.
              We give you a link so that you can easily return to your ballot whenever you want.
            </span></div>
          </section>
          <section className="detail_module">
            <div className="title"><span>4. We'll keep your selections private and anonymized</span></div>
            <div className="desc"><span>
              We don't store any personally identifiable information, so all of your preferences are anonymous.
            </span></div>
          </section>
        </section>
      </section>
    );
  }
}
export default DetailSection;

import React, { Component } from 'react';

import BallotTranslateSwitch from '../ballot/BallotTranslateSwitch';
import BallotHeading from '../ballot/BallotHeading';
import BallotCard from '../ballot/BallotCard';

import sampleData from '../ballot/examples/sample_data';
import sampleDataEs from '../ballot/examples/sample_data_es';

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
      ballotsEs: sampleDataEs,
      tallies: tallies,
      es: false
    };
    this.onUpdate = this.onUpdate.bind(this);
    this.onSwitchTranslate = this.onSwitchTranslate.bind(this);
  }

  onUpdate(index, newTally) {
    this.setState({
      tallies: this.state.tallies.map((tally, i) => ((i === index) ? newTally : tally))
    });
  }

  onSwitchTranslate(es) {
    this.setState({ es });
  }

  render() {

    let { es } = this.state;
    let ballots = (!es) ? this.state.ballots : this.state.ballotsEs;

    return (
      <section id="detail">
        <section id="left">
          <BallotTranslateSwitch es={es} translate={this.onSwitchTranslate} />
          <BallotHeading
            title={!es ? 'Consolidated General Election' : 'Consolidada elección general'}
            secondary={!es ? 'LOS ANGELES, CALIFORNIA' : 'LOS ANGELES, CALIFORNIA'}
            sub={!es ? 'Nov 8, 2016' : '8 Nov, 2016'}
          />
          {ballots.map((ballot, i) => (
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
        <section id="right">
          <section className="detail_module">
            <div className="title"><span>1. View your local ballot</span></div>
            <div className="desc"><span>Access ballot content you'll see on election day. Enter the home address linked to your voter registration to bring up your specific ballot.</span></div>
          </section>
          <section className="detail_module">
            <div className="title"><span>2. Inspect the details of candidates and measures</span></div>
            <div className="desc"><span>Getting informed on ballot content has never been easier. Simply click on candidates, measures, or titles to access detailed, nonpartisan information to help you make your decisions.</span></div>
          </section>
          <section className="detail_module">
            <div className="title"><span>3. Record your preferences</span></div>
            <div className="desc"><span>Select your preferences and send yourself a receipt via email. We also provide a link in the email, so that you can easily return to your ballot whenever you want.</span></div>
          </section>
          <section className="detail_module">
            <div className="title"><span>4. We'll keep your selections private and anonymized</span></div>
            <div className="desc"><span>We don't store any personally identifiable information, so all of your preferences are anonymous.</span></div>
          </section>
        </section>
      </section>
    );
  }
}
export default DetailSection;

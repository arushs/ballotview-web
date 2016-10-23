import React, { Component } from 'react';
import request from 'request';

import api from '../api-interface';

import Ballot from '../components/ballot/Ballot';
import Inspector from '../components/inspector/Inspector';
import InspectorNav from '../components/inspector/InspectorNav';

import ballots from '../components/ballot/examples/sample_data';
// const tallies = ballots.ballot.map((ballot) => ballot.cards.map((card) => card.poll.map((option) => (false))));

class BallotView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: ballots.heading,
      ballot: [],
      tallies: [],
      write_id: null,
      read_id: null,
      show_inspector: false
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.saveBallotToDatabase = this.saveBallotToDatabase.bind(this);
  }

  componentWillMount() {
    let _this = this;

    api.getWritableBallot(this.props.params.bvId)
      .then(function (data) {
        if ('error' in data || data.statusCode !== 200) {
          console.log('error');
        } else {
          _this.setState(data.body);
        }
      });
  }

  saveBallotToDatabase() {
    api.updateWriteableBallot(this.state.write_id, this.state.tallies)
      .then(function (data) {
        if ('error' in data || data.statusCode !== 200) {
          console.log('error');
        } else {
          console.log('ballot saved');
        }
      })
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
            <button onClick={this.saveBallotToDatabase}>Save Ballot</button>
            <button>Share</button>
          </div>
        </section>
        <section id="ballot">
          <Ballot
            heading={this.state.heading}
            ballots={this.state.ballot}
            tallies={this.state.tallies}
            onUpdate={this.onUpdate}
          />
        </section>
        <section id="inspector_nav">
          <InspectorNav ballots={this.state.ballot} />
        </section>
        {(()=>{ if (this.state.show_inspector) {
          return (
            <section id="inspector">
              <Inspector />
            </section>
          );
        }})()}
      </main>
    );
  }
}

BallotView.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BallotView;

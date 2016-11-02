import React, { Component } from 'react';
import classNames from 'classnames';
import request from 'request';
import Cookies from 'js-cookie';
import _ from 'lodash';

import api from '../api-interface';

import Ballot from '../components/ballot/Ballot';
import Inspector from '../components/inspector/Inspector';
import InspectorNav from '../components/inspector/InspectorNav';
import ModalSave from '../components/inspector/ModalSave';
import ModalPolling from '../components/inspector/ModalPolling';

import ballots from '../components/ballot/examples/sample_data';
// const tallies = ballots.ballot.map((ballot) => ballot.cards.map((card) => card.poll.map((option) => (false))));

class BVBallot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: {},
      polling_location: {},
      ballot: [],
      tallies: [],
      write_id: null,
      read_id: null,
      saving: false,
      selectedBallot: {},
      inspector: [],
      modal: null
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.saveBallotToDatabase = this.saveBallotToDatabase.bind(this);
    this.onSelectBallot = this.onSelectBallot.bind(this);
    this.createNewBallot = this.createNewBallot.bind(this);
  }

  componentWillMount() {
    let _this = this;

    if (!this.state.write_id) {
      let bvId = this.props.params.bvId;

      api.getWritableBallot(bvId)
        .then(function (data) {
          console.log(data.body);
          _this.setState(data.body, () => {
            Cookies.set('write_id', bvId);
          });
        }).catch(function (error) {
          if (error.message.indexOf('exist') > -1) {
            // ballot does not exist
            Cookies.remove('write_id');
            _this.context.router.push({ pathname: '/' });
          } else {
            console.error(error);
          }
        });

    } else {
      Cookies.set('write_id', this.state.write_id);
    }
  }

  componentWillUpdate(newProps, newState) {
    if (newState.saving) {
      window.onbeforeunload = () => ('Your ballot has not been saved. Are you sure you want to leave?');
    } else {
      window.onbeforeunload = () => {};
    }
  }

  saveBallotToDatabase() {
    let _this = this;
    this.setState({
      saving: true
    });
    api.updateWriteableBallot(this.state.write_id, this.state.tallies)
      .then(function (data) {
        if ('error' in data || data.statusCode !== 200) {
          // console.log('error');
        } else {
          _this.setState({
            saving: false
          });
        }
      })
  }

  onUpdate(ballotIndex, cardIndex, newTally) {
    let tallies = this.state.tallies;
    tallies[ballotIndex] = tallies[ballotIndex].map((tally, i) => ((i === cardIndex) ? newTally : tally));
    this.setState({ tallies }, this.saveBallotToDatabase);
  }

  onSelectBallot(ballotIndex, cardIndex) {

    let updateInspector = () => {
      console.log(this.state.ballot[ballotIndex].title);
      console.log(this.state.ballot[ballotIndex].cards[cardIndex].title[0]);
      if (this.state.ballot[ballotIndex].cards[cardIndex].title[0].includes('President And Vice President')) {
        // Append names together
        let query = this.state.ballot[ballotIndex].cards[cardIndex].poll.map(function(poll) {
          return (poll.info[0].title[0] + "_" + poll.info[1].title[0]);
        });

        console.log(query);

        api.searchCandidate(query)
          .then(({ body }) => {
            this.setState({ inspector: body.data || [] });
          });
      } else {
        api.searchReferendum(this.state.ballot[ballotIndex].cards[cardIndex].toc[0])
          .then(({ body }) => {
            this.setState({ inspector: body.data || [] });
          });
      }
    }
    updateInspector = updateInspector.bind(this);

    if (this.state.selectedBallot.ballotIndex === ballotIndex && this.state.selectedBallot.cardIndex === cardIndex) {
      this.setState({ selectedBallot: {}, inspector: [] });
    } else {
      this.setState({ selectedBallot: { ballotIndex, cardIndex }, inspector: [] }, updateInspector);
    }
  }

  createNewBallot() {
    Cookies.remove('write_id');
    this.context.router.push({ pathname: '/' });
  }

  render() {
    return (
      <main id="ballotview">
        <section id="toolbar">
          <div id="logo">
            <div className="logo_img" onClick={this.createNewBallot}>
              <img src="/dist/images/ballotview-black.png" />
            </div>
            <div className="title">BallotView</div>
          </div>
          <div id="saveActions">
            <span>{this.state.saving ? 'Saving...' : 'Edit Mode'}</span>
            <button onClick={() => {
              this.saveBallotToDatabase();
              this.setState({ modal: 'SAVE' });
            }}>Save Ballot</button>
            {(() => {
              if (!_.isEmpty(this.state.polling_location)) {
                return (
                  <button onClick={() => {
                    this.setState({ modal: 'POLL' });
                  }}>Voting Location</button>
                );
              }
            })()}
          </div>
        </section>
        <section id="ballot" className={classNames({ isolate: 'cardIndex' in this.state.selectedBallot })}>
          <Ballot
            heading={this.state.heading}
            ballots={this.state.ballot}
            tallies={this.state.tallies}
            onUpdate={this.onUpdate}
            selectedBallot={this.state.selectedBallot}
            onSelectBallot={this.onSelectBallot}
          />
        </section>
        <section id="inspector_nav">
          <InspectorNav ballots={this.state.ballot} />
        </section>
        <section id="inspector">
          <Inspector
            modules={this.state.inspector}/>
        </section>
        {(() => {
          switch (this.state.modal) {
            case 'SAVE':
              return (
                <ModalSave
                  write_id={this.state.write_id}
                  read_id={this.state.read_id}
                  onClose={() => {
                    this.setState({ modal: null });
                  }}
                />
              );
              break;
            case 'POLL':
              return (
                <ModalPolling
                  polling_location={this.state.polling_location}
                  onClose={() => {
                    this.setState({ modal: null });
                  }}
                />
              );
              break;
            default:
              break;
          }
        })()}
      </main>
    );
  }
}

BVBallot.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BVBallot;

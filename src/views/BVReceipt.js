import React, { Component } from 'react';
import Cookies from 'js-cookie';
import _ from 'lodash';

import api from '../api-interface';

import ModalPolling from '../components/inspector/ModalPolling';

import Ballot from '../components/ballot/BallotReceipt';
// import Inspector from '../components/inspector/Inspector';
// import InspectorNav from '../components/inspector/InspectorNav';

// import ballots from '../components/ballot/examples/sample_data';
// const tallies = ballots.ballot.map((ballot) => ballot.cards.map((card) => card.poll.map((option) => (false))));

class BVReceipt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // heading: ballots.heading,
      ballot: [],
      tallies: [],
      polling_location: {},
      read_id: null
    };

    this.createNewBallot = this.createNewBallot.bind(this);
  }

  componentWillMount() {
    let _this = this;

    api.getReadOnlyBallot(this.props.params.bvId)
      .then(function (data) {
        if ('error' in data || data.statusCode !== 200) {
          console.log('error');
        } else {
          _this.setState(data.body);
          if (parseInt(_this.props.location.query.print) === 1) {
            window.print();
          }
        }
      });
  }

  createNewBallot() {
    Cookies.remove('write_id');
    this.context.router.push({ pathname: '/' });
    window.scrollTo(0, 0);
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
            <span>Read-Only Mode</span>
            {(() => {
              if (!_.isEmpty(this.state.polling_location)) {
                return (
                  <button className="big" onClick={() => {
                    this.setState({ modal: 'POLL' });
                  }}>Voting Location</button>
                );
              }
            })()}
            <button className="big" onClick={window.print}>Print</button>
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
        {(() => {
          switch (this.state.modal) {
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

BVReceipt.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BVReceipt;

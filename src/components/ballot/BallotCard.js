import React, { Component } from 'react';
import BallotHeading from './BallotHeading';
import BallotPoll from './BallotPoll';

class BallotCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [{ text: 'I. ', click: false }, { text: 'President and Vice President of the United States', click: true }],
      secondary: [{ text: 'Vote for 1 pair', click: false }],
      poll: [{
        info: [{
          title: [{ text: 'Hilary Clinton', click: true }],
          sub: [{ text: 'for ', click: false }, { text: 'President', click: true }]
        }, {
          title: [{ text: 'Tim Kaine', click: true }],
          sub: [{ text: 'for ', click: false }, { text: 'Vice President', click: true }]
        }],
        trail: [{ text: 'Democrat', click: true }],
        color: '#0D47A1'
      }, {
        info: [{
          title: [{ text: 'Donald Trump', click: true }],
          sub: [{ text: 'for ', click: false }, { text: 'President', click: true }]
        }, {
          title: [{ text: 'Mike Pence', click: true }],
          sub: [{ text: 'for ', click: false }, { text: 'Vice President', click: true }]
        }],
        trail: [{ text: 'Republican', click: true }],
        color: '#B71C1C'
      }, {
        info: [{
          title: [{ text: 'Gary Johnson', click: true }],
          sub: [{ text: 'for ', click: false }, { text: 'President', click: true }]
        }, {
          title: [{ text: 'William Weld', click: true }],
          sub: [{ text: 'for ', click: false }, { text: 'Vice President', click: true }]
        }],
        trail: [{ text: 'Libertarian', click: true }],
        color: '#F57F17'
      }, {
        info: [{
          title: [{ text: 'Jill Stein', click: true }],
          sub: [{ text: 'for ', click: false }, { text: 'President', click: true }]
        }, {
          title: [{ text: 'Ajamu Baraka', click: true }],
          sub: [{ text: 'for ', click: false }, { text: 'Vice President', click: true }]
        }],
        trail: [{ text: 'Green', click: true }],
        color: '#558B2F'
      }],
      tally: [false, false, false, false]
    };

    this.click = this.click.bind(this);
    this.pollSelectOption = this.pollSelectOption.bind(this);
  }

  click() {

  }

  pollSelectOption(index, e) {
    e.stopPropagation();
    this.setState({ tally: this.state.tally.map((bool, i) => {
      return (index == i && !bool);
    }) });
  }

  shouldComponentUpdate(newProps, newState) {
    for (var i in this.state.tally)
      if (this.state.tally[i] !== newState.tally) return true;
    return false;
  }

  render() {
    return (
      <div className="ballot_card">
        <BallotHeading
          title={this.state.title}
          secondary={this.state.secondary}
          click={this.click}
        />
        <BallotPoll
          pollData={this.state.poll}
          pollTally={this.state.tally}
          pollSelectOption={this.pollSelectOption}
          click={this.click}
        />
        { this.props.children }
      </div>
    );
  }
}

BallotCard.propTypes = {
  children: React.PropTypes.element
};

export default BallotCard;

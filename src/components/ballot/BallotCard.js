import React, { Component } from 'react';
import BallotHeading from './BallotHeading';
import BallotPoll from './BallotPoll';

class BallotCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [{text:'I. ', click: false}, {text: 'President and Vice President of the United States', click: true}],
      secondary: [{text: 'Vote for 1 pair', click: false}],
      poll: [{
        selected: false,
        info: [{
          title: [{text: 'Hilary Clinton', click: true}],
          sub: [{text: 'for ', click: false}, {text: 'President', click: true}]
        }, {
          title: [{text: 'Tim Kaine', click: true}],
          sub: [{text: 'for ', click: false}, {text: 'Vice President', click: true}]
        }],
        trail: [{text: 'Democrat', click: true}]
      }, {
        selected: false,
        info: [{
          title: [{text: 'Donald Trump', click: true}],
          sub: [{text: 'for ', click: false}, {text: 'President', click: true}]
        }, {
          title: [{text: 'Mike Pence', click: true}],
          sub: [{text: 'for ', click: false}, {text: 'Vice President', click: true}]
        }],
        trail: [{text: 'Republican', click: true}]
      }]
    };

    this.click = this.click.bind(this);
    this.pollSelectOption = this.pollSelectOption.bind(this);
  }

  click() {

  }

  pollSelectOption(index) {
    let tempPoll = this.state.poll;

    tempPoll.map((option, i) => {
      option.selected = (i == index && !option.selected);
      return option;
    });

    this.setState({
      poll: tempPoll
    });
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

import React from 'react';
import BallotClickableText from './BallotClickableText';
import BallotPoll from './BallotPoll';

const BallotCard = ({ id, title, secondary, poll, tally, onUpdate, click, children }) => {

  function pollSelectOption(index) {
    let newTally = tally.map((bool, i) => {
      return (index === i && !bool);
    });
    onUpdate(id, newTally);
  }

  // shouldComponentUpdate(newProps, newState) {
  //   for (var i in this.state.tally)
  //     if (this.state.tally[i] !== newState.tally) return true;
  //   return false;
  // }

  return (
    <div className="ballot_card">
      <div className="heading">
        <div className="title">
          <BallotClickableText text={title} click={click} />
        </div>
        <div className="sub">
          <BallotClickableText text={secondary} click={click} />
        </div>
      </div>

      <BallotPoll
        pollData={poll}
        pollTally={tally}
        pollSelectOption={pollSelectOption}
        click={click}
      />

      { children }
    </div>
  );
}

BallotCard.propTypes = {
  children: React.PropTypes.element,
  title: React.PropTypes.array,
  secondary: React.PropTypes.array,
  click: React.PropTypes.func,
  poll: React.PropTypes.array,
  tally: React.PropTypes.array,
  onUpdate: React.PropTypes.func,
  id: React.PropTypes.number
};

export default BallotCard;

import React from 'react';
import classNames from 'classnames';
import BallotClickableText from './BallotClickableText';
import BallotChoice from './BallotChoice';

const BallotReceiptCard = ({ ballotIndex, cardIndex, title, poll, tally, children, className, ...other }) => {

  return (
    <div className={classNames('ballot_card', 'ballot_receipt', className)} {...other}>
      <div className="heading">
        <div className="title">
          <BallotClickableText text={title} click={() => {}} />
        </div>
      </div>

      <BallotChoice
        pollData={poll}
        pollTally={tally}
        click={() => {}}
      />

      { children }
    </div>
  );
}

BallotReceiptCard.propTypes = {
  ballotIndex: React.PropTypes.number,
  cardIndex: React.PropTypes.number,
  title: React.PropTypes.array,
  poll: React.PropTypes.array,
  tally: React.PropTypes.array,
  children: React.PropTypes.element
};

export default BallotReceiptCard;

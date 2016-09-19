import React from 'react';
import BallotHeading from './BallotHeading';
import BallotPoll from './BallotPoll';

const BallotCard = ({ children }) => {
  let title = 'I. President and Vice President of the United States';
  let titleCallback = function () {};
  let secondary = 'Vote for 1 pair';
  let poll = [];

  return (
    <div className="ballot_card">
      <BallotHeading
        title={title}
        titleCallback={titleCallback}
        secondary={secondary}
      />
      <BallotPoll
        poll={poll}
      />
      { children }
    </div>
  );
};

BallotCard.propTypes = {
  children: React.PropTypes.element
};

export default BallotCard;

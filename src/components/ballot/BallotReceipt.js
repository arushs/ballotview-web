import React from 'react';
// import BallotHeading from './BallotHeading';
import BallotReceiptCard from './BallotReceiptCard';
import classNames from 'classnames';

const BallotReceipt = ({ ballots, tallies }) => (
  <section className="ballot">
    {/*<BallotHeading
      title={heading.title}
      secondary={heading.location}
      sub={heading.date}
    />*/}
    {ballots.map((ballot, ballotIndex) => (
      <section key={"ballot-" + ballotIndex}>
        <h2 id={ballot.title}>{ballot.title}</h2>
        {ballot.cards.map((card, cardIndex) => (
          <BallotReceiptCard
            key={"card-" + cardIndex}
            ballotIndex={ballotIndex}
            cardIndex={cardIndex}
            title={card.title}
            poll={card.poll}
            tally={tallies[ballotIndex][cardIndex]}
            id={ballotIndex + "-" + cardIndex}
          />
        ))}
      </section>
    ))}
  </section>
);

BallotReceipt.propTypes = {
  // heading: React.PropTypes.object.isRequired,
  ballots: React.PropTypes.array.isRequired,
  tallies: React.PropTypes.array.isRequired
};

export default BallotReceipt;

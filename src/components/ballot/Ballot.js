import React from 'react';
import BallotHeading from './BallotHeading';
import BallotCard from './BallotCard';

const Ballot = ({ heading, ballots, tallies, onUpdate }) => (
  <section className="ballot">
    <BallotHeading
      title={heading.title}
      secondary={heading.location}
      sub={heading.date}
    />
    {ballots.map((ballot, ballotIndex) => (
      <section key={"ballot-" + ballotIndex}>
        <h2>{ballot.title}</h2>
        {ballot.cards.map((card, cardIndex) => (
          <BallotCard
            key={"card-" + cardIndex}
            ballotIndex={ballotIndex}
            cardIndex={cardIndex}
            title={card.title}
            secondary={card.subtext}
            poll={card.poll}
            tally={tallies[ballotIndex][cardIndex]}
            onUpdate={onUpdate}
            click={() => {}}
            />
        ))}
      </section>
    ))}
  </section>
);

Ballot.propTypes = {
  heading: React.PropTypes.object.isRequired,
  ballots: React.PropTypes.array.isRequired,
  tallies: React.PropTypes.array.isRequired,
  onUpdate: React.PropTypes.func.isRequired,
};

export default Ballot;

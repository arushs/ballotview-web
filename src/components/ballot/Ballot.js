import React from 'react';
import BallotHeading from './BallotHeading';
import BallotCard from './BallotCard';
import classNames from 'classnames';

const Ballot = ({ heading, ballots, tallies, onUpdate, selectedBallot, onSelectBallot }) => (
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
          <BallotCard
            selected={(selectedBallot)
              && (selectedBallot.ballotIndex === ballotIndex
              && selectedBallot.cardIndex === cardIndex)}
            next={(e) => { e.stopPropagation(); onSelectBallot(ballotIndex, cardIndex + 1, card.level) }}
            onClick={(e) => { e.stopPropagation(); onSelectBallot(ballotIndex, cardIndex, card.level) }}
            key={"card-" + cardIndex}
            ballotIndex={ballotIndex}
            cardIndex={cardIndex}
            title={card.title}
            secondary={card.subtext}
            poll={card.poll}
            tally={tallies[ballotIndex][cardIndex]}
            onUpdate={onUpdate}
            level={card.level}
            click={() => {}}
            id={ballotIndex + "-" + cardIndex}
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
  selectedBallot: React.PropTypes.object,
  onSelectBallot: React.PropTypes.func
};

export default Ballot;

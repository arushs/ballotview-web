import React from 'react';
import BallotHeading from './BallotHeading';
import BallotCard from './BallotCard';
import classNames from 'classnames';
import Inspector from '../inspector/Inspector';
// import _ from 'lodash';

const Ballot = ({ heading, ballots, tallies, onUpdate, selectedBallot, onSelectBallot, forcePoll, address, inspector }) => (
  <section className="ballot">
    {/*<BallotHeading
      title={heading.title}
      secondary={heading.location}
      sub={heading.date}
    />*/}
    {ballots.map((ballot, ballotIndex) =>
      (<section key={"ballot-" + ballotIndex}>
        <h2 id={ballot.title}>{ballot.title}</h2>
        {ballot.cards.map((card, cardIndex) => {

          let selected = (selectedBallot)
            && (selectedBallot.ballotIndex === ballotIndex
            && selectedBallot.cardIndex === cardIndex);

          return (<BallotCard
            selected={selected}
            next={(e) => { e.stopPropagation(); onSelectBallot(ballotIndex, cardIndex + 1, card.level, address) }}
            onClick={(e) => { e.stopPropagation(); onSelectBallot(ballotIndex, cardIndex, card.level, address) }}
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
            forcePoll={forcePoll}>

            {(() => {
              if (inspector && inspector.length > 0 && selected) {
                return (<Inspector
                  modules={inspector}
                  cardInfo={card}/>);
              }
            })()}

          </BallotCard>)
        })}
      </section>))}
  </section>);

Ballot.propTypes = {
  heading: React.PropTypes.object.isRequired,
  ballots: React.PropTypes.array.isRequired,
  tallies: React.PropTypes.array.isRequired,
  onUpdate: React.PropTypes.func.isRequired,
  selectedBallot: React.PropTypes.object,
  onSelectBallot: React.PropTypes.func,
  forcePoll: React.PropTypes.bool,
  inspector: React.PropTypes.array
};

export default Ballot;

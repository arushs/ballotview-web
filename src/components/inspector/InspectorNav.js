import React from 'react';
import BallotClickableText from '../ballot/BallotClickableText';

const InspectorNav = ({ ballots }) => (
  <ul className="nav">
    {ballots.map((ballot, ballotIndex) => (
      <li key={ballotIndex}>
        <a>{ballot.title}</a>
        <ul>
          {ballot.cards.map((card, cardIndex) => (
            <li key={cardIndex}><a><BallotClickableText text={[card.title]} /></a></li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

export default InspectorNav;

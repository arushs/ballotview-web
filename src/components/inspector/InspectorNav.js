import React from 'react';
import BallotClickableText from '../ballot/BallotClickableText';

const InspectorNav = ({ ballots }) => (
  <ul className="nav">
    {ballots.map((ballot, ballotIndex) => (
      <li key={ballotIndex}>
        <a href={"#" + ballot.title}>{ballot.title}</a>
        <ul>
          {ballot.cards.map((card, cardIndex) => (
            <li key={cardIndex}>
              <a href={"#" + ballotIndex + "-" + cardIndex}>
                <BallotClickableText text={card.title} click={()=>{}} />
              </a>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

export default InspectorNav;

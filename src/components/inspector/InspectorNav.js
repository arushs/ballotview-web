import React from 'react';
import BallotClickableText from '../ballot/BallotClickableText';

function scrollToAnchor(anchor) {
  let node = document.getElementById(anchor);
  if (node) {
    // console.log(node.offsetTop);
    let top = node.offsetTop;
    window.scrollTo(0, top - 16);
  }
}

const InspectorNav = ({ ballots }) => (
  <ul className="nav">
    {ballots.map((ballot, ballotIndex) => (
      <li key={ballotIndex}>
        <a onClick={() => { scrollToAnchor(ballot.title) }}>{ballot.title}</a>
        <ul>
          {ballot.cards.map((card, cardIndex) => (
            <li key={cardIndex}>
              <a onClick={() => { scrollToAnchor(ballotIndex + "-" + cardIndex) }}>
                <BallotClickableText text={card.toc || card.title} click={()=>{}} />
              </a>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

export default InspectorNav;

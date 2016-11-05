import React from 'react';
import BallotClickableText from '../ballot/BallotClickableText';
import classNames from 'classnames';

function scrollToAnchor(anchor) {
  let node = document.getElementById(anchor);
  if (node) {
    // console.log(node.offsetTop);
    let top = node.offsetTop;
    window.scrollTo(0, top - 16);
  }
}

const InspectorNav = ({ ballots, tallies, selectedBallot, onSelectBallot }) => {

  function checkRadioSelected(tally) {
    return tally.filter(bool => bool).length > 0;
  }

  return (<ul className="nav">
    {ballots.map((ballot, ballotIndex) => (
      <li key={ballotIndex}>
        <a onClick={() => { scrollToAnchor(ballot.title) }}>{ballot.title}</a>
        <ul>
          {ballot.cards.map((card, cardIndex) => (
            <li key={cardIndex} className={classNames({
              strike: checkRadioSelected(tallies[ballotIndex][cardIndex]),
              selected: (selectedBallot.ballotIndex === ballotIndex && selectedBallot.cardIndex === cardIndex)
            })}>
              <a onClick={() => {
                scrollToAnchor(ballotIndex + "-" + cardIndex);
                onSelectBallot(ballotIndex, cardIndex, card.level)
               }}>
                <BallotClickableText text={card.toc || card.title} click={()=>{}} />
              </a>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
)};

export default InspectorNav;

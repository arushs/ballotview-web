import React from 'react';

const BallotPoll = (props) => {
  const { poll } = props;

  return (
    <ul className="ballot_poll">
      {poll.map((data, i) => (
        <li key="i">
        </li>
      ))}
    </ul>
  );
};

export default BallotPoll;

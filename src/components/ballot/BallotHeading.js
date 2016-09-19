import React from 'react';
import BallotClickableText from './BallotClickableText';

const BallotHeading = ({ title, secondary, click }) => (
  <div className="ballot_heading">
    <div className="title">
      <BallotClickableText text={title} click={click} />
    </div>
    <div className="sub">
      <BallotClickableText text={secondary} click={click} />
    </div>
  </div>
);

BallotHeading.propTypes = {
  title: React.PropTypes.array.isRequired,
  secondary: React.PropTypes.array.isRequired,
  click: React.PropTypes.func
};

export default BallotHeading;

import React from 'react';
import BallotClickableText from './BallotClickableText';

const BallotHeading = ({ title, secondary, sub }) => (
  <div className="ballot_heading">
    <div className="title"><span>{title}</span></div>
    <div className="title"><span>{secondary}</span></div>
    <div className="sub"><span>{sub}</span></div>
  </div>
);

BallotHeading.propTypes = {
  title: React.PropTypes.string.isRequired,
  secondary: React.PropTypes.string.isRequired,
  sub: React.PropTypes.string.isRequired
};

export default BallotHeading;

import React from 'react';

const BallotHeading = (props) => {
  let { title, titleCallback, secondary } = props;

  return (
  <div className="ballot_heading">
    <div className="title">
      <span onClick={titleCallback} className="clickable">{title}</span>
    </div>
    <div className="sub"><span>{secondary}</span></div>
  </div>
  );
};

BallotHeading.propTypes = {
  title: React.PropTypes.string.isRequired,
  titleCallback: React.PropTypes.function,
  secondary: React.PropTypes.string.isRequired
};

export default BallotHeading;

import React from 'react';

const BallotHeading = (props) => {

  let { title, titleCallback, secondary } = props;

  return (
    <div className="ballot_heading">
      <div className="title"><span onClick={titleCallback} className="clickable">{title}</span></div>
      <div className="sub"><span>{secondary}</span></div>
    </div>
  );

}

export default BallotHeading;

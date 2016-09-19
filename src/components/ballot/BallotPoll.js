import React from 'react';
import BallotClickableText from './BallotClickableText';
const BallotPoll = ({ pollData, pollSelectOption, click }) => (
  <ul className="ballot_poll">
    {pollData.map((data, i) => (
      <li key={i}>
        <div className={"radio " + (data.selected ? "selected" : "")} onClick={()=>{pollSelectOption(i)}}><span /></div>
        <div className="info">
          <div className="trail">
            <BallotClickableText text={data.trail} click={click}/>
          </div>
          {data.info.map((option, i) => {
            return (
              <div className="ballot_option" key={"option-" + i}>
                <BallotClickableText className="option_title" text={option.title} click={click}/>
                <BallotClickableText className="option_sub" text={option.sub} click={click}/>
              </div>
            );
          })}
        </div>
      </li>
    ))}
  </ul>
);

BallotPoll.propTypes = {
  pollData: React.PropTypes.array.isRequired,
  pollSelectOption: React.PropTypes.func,
  click: React.PropTypes.func
};

export default BallotPoll;

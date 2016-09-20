import React from 'react';
import classNames from 'classnames';
import BallotClickableText from './BallotClickableText';

const BallotPoll = ({ pollData, pollTally, pollSelectOption, click }) => (
  <ul className="ballot_poll">
    {pollData.map((data, i) => (
      <li key={i}>

        <div
          className={classNames('radio', { selected: pollTally[i] })}
          onClick={((e) => { pollSelectOption(i, e); })}
        ><span /></div>

        <div className="info">
          <div className="trail">
            <BallotClickableText text={data.trail} click={click} />
          </div>
          {data.info.map((option, j) => (
            <div className="ballot_option" key={j}>
              <BallotClickableText className="option_title" text={option.title} click={click} />
              <BallotClickableText className="option_sub" text={option.sub} click={click} />
            </div>
          ))}
        </div>

      </li>
    ))}
  </ul>
);

BallotPoll.propTypes = {
  pollData: React.PropTypes.array.isRequired,
  pollTally: React.PropTypes.array.isRequired,
  pollSelectOption: React.PropTypes.func,
  click: React.PropTypes.func
};

export default BallotPoll;

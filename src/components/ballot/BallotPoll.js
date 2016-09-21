import React from 'react';
import classNames from 'classnames';
import BallotClickableText from './BallotClickableText';

const BallotPoll = ({ pollData, pollTally, pollSelectOption, click }) => (
  <ul className="ballot_poll">
    {pollData.map((data, i) => {

      let selectOption = (e) => {
        e.stopPropagation();
        pollSelectOption(i);
      }

      return (<li key={i}>

        <div
          className={classNames('radio', { selected: pollTally[i] })}
          onClick={selectOption}
          style={{ backgroundColor: data.color }}
        ><span /></div>

        <div className="info">
          {(() => { if (data.trail) {
            return (<div className="trail">
              <BallotClickableText
                text={data.trail}
                click={click}
                style={{ color: data.color }}
              />
            </div>);
          }})()}
          {data.info.map((option, j) => (
            <div className="ballot_option" key={j}>
              {(() => { if (option.title) {
                return (<BallotClickableText className="option_title" text={option.title} click={click} />);
              }})()}

              {(() => { if (option.sub) {
                return (<BallotClickableText className="option_sub" text={option.sub} click={click} />);
              }})()}

            </div>
          ))}
        </div>

      </li>);
    })}
  </ul>
);

BallotPoll.propTypes = {
  pollData: React.PropTypes.array.isRequired,
  pollTally: React.PropTypes.array.isRequired,
  pollSelectOption: React.PropTypes.func,
  click: React.PropTypes.func
};

export default BallotPoll;

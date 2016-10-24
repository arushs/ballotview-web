import React from 'react';
import classNames from 'classnames';
import BallotClickableText from './BallotClickableText';

const BallotPoll = ({ pollData, pollTally, pollSelectOption, click, ...other }) => (
  <ul className={classNames('ballot_poll')}>
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
          {(() => { if ('trail' in data) {
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
              {(() => { if ('title' in option) {
                return (<BallotClickableText className="option_title" text={option.title} click={click} />);
              }})()}
              {(() => { if ('sub' in option) {
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

const BallotCard = ({ ballotIndex, cardIndex, title, secondary, poll, tally, onUpdate, click, children, className, ...other }) => {

  function pollSelectOption(index) {
    let newTally = tally.map((bool, i) => {
      return (index === i && !bool);
    });
    onUpdate(ballotIndex, cardIndex, newTally);
  }

  return (
    <div className={classNames('ballot_card', className)} {...other}>
      <div className="heading">
        <div className="title">
          <BallotClickableText text={title} click={click} />
        </div>
        {(() => { if (secondary) {
          return (<div className="sub">
            <BallotClickableText text={secondary} click={click} />
          </div>);
        }})()}
      </div>

      <BallotPoll
        pollData={poll}
        pollTally={tally}
        pollSelectOption={pollSelectOption}
        click={click}
      />

      { children }
    </div>
  );
}

BallotCard.propTypes = {
  ballotIndex: React.PropTypes.number,
  cardIndex: React.PropTypes.number,
  title: React.PropTypes.array,
  secondary: React.PropTypes.array,
  click: React.PropTypes.func,
  poll: React.PropTypes.array,
  tally: React.PropTypes.array,
  onUpdate: React.PropTypes.func,
  children: React.PropTypes.element
};

export default BallotCard;

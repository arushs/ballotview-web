import React from 'react';
import classNames from 'classnames';
import BallotClickableText from './BallotClickableText';

const BallotChoice = ({ pollData, pollTally, click, ...other }) => (
  <ul className={classNames('ballot_poll')}>
    {(() => {
      let pd = pollData.filter((data, i) => (pollTally[i]))
      if (pd.length > 0) {
        return pd.map((data, i) => (
        <li key={i} style={{ color: data.color }}>
          <div className="info">
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
        </li>));
      } else {
        return (
          <li>
            <div className="info">
              <span className="empty">No selection</span>
            </div>
          </li>
        );
      }
    })()}
  </ul>
);

BallotChoice.propTypes = {
  pollData: React.PropTypes.array.isRequired,
  pollTally: React.PropTypes.array.isRequired,
  click: React.PropTypes.func
};

const BallotReceiptCard = ({ ballotIndex, cardIndex, title, poll, tally, children, className, ...other }) => {

  return (
    <div className={classNames('ballot_card', 'ballot_receipt', className)} {...other}>
      <div className="heading">
        <div className="title">
          <BallotClickableText text={title} click={() => {}} />
        </div>
      </div>

      <BallotChoice
        pollData={poll}
        pollTally={tally}
        click={() => {}}
      />

      { children }
    </div>
  );
}

BallotReceiptCard.propTypes = {
  ballotIndex: React.PropTypes.number,
  cardIndex: React.PropTypes.number,
  title: React.PropTypes.array,
  poll: React.PropTypes.array,
  tally: React.PropTypes.array,
  children: React.PropTypes.element
};

export default BallotReceiptCard;

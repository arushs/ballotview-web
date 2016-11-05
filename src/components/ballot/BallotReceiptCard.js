import React from 'react';
import classNames from 'classnames';
import BallotClickableText from './BallotClickableText';
import BallotChoice from './BallotChoice';
import _ from 'lodash';

const BallotReceiptCard = ({ ballotIndex, cardIndex, title, poll, tally, children, className, ...other }) => {

  let president = title.join(' ').toUpperCase().indexOf('VICE PRE') > -1;

  function move(array, old_index, new_index) {
    while (old_index < 0) {
        old_index += array.length;
    }
    while (new_index < 0) {
        new_index += array.length;
    }
    if (new_index >= array.length) {
        var k = new_index - array.length;
        while ((k--) + 1) {
            array.push(undefined);
        }
    }
    array.splice(new_index, 0, array.splice(old_index, 1)[0]);
    return array; // for testing purposes
  };

  if (president) {
    let trump_index = _.findIndex(poll, o => JSON.stringify(o).toUpperCase().indexOf('TRUM') > -1);
    poll = move(poll, trump_index, 0);
    let clinton_index = _.findIndex(poll, o => JSON.stringify(o).toUpperCase().indexOf('CLINT') > -1);
    poll = move(poll, clinton_index, 0);
  }

  console.log(poll);

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
  president: React.PropTypes.bool,
  tally: React.PropTypes.array,
  children: React.PropTypes.element
};

export default BallotReceiptCard;

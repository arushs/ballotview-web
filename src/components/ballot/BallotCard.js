import React, { Component } from 'react';
import classNames from 'classnames';
import BallotClickableText from './BallotClickableText';
import BallotChoice from './BallotChoice';
import _ from 'lodash';

const BallotPoll = ({ pollData, pollTally, pollSelectOption, click, className, president, ...other }) => {

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
    let trump_index = _.findIndex(pollData, o => JSON.stringify(o).toUpperCase().indexOf('TRUM') > -1);
    pollData = move(pollData, trump_index, 0);
    let clinton_index = _.findIndex(pollData, o => JSON.stringify(o).toUpperCase().indexOf('CLINT') > -1);
    pollData = move(pollData, clinton_index, 0);
  }

  return (<ul className={classNames('ballot_poll', className)}>
    {pollData.map((data, i) => {

      let selectOption = (e) => {
        e.stopPropagation();
        pollSelectOption(i);
      };

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
  </ul>);
};

BallotPoll.propTypes = {
  pollData: React.PropTypes.array.isRequired,
  pollTally: React.PropTypes.array.isRequired,
  pollSelectOption: React.PropTypes.func,
  president: React.PropTypes.bool,
  click: React.PropTypes.func
};

class BallotCard extends Component {

  constructor(props) {
    super(props);
    let { ballotIndex, cardIndex, tally } = props;
    this.state = {
      collapsed: this.checkRadioSelected()
    };
    this.pollSelectOption = this.pollSelectOption.bind(this);
    this.collapseToggle = this.collapseToggle.bind(this);
  }

  pollSelectOption(index) {
    let { onUpdate, ballotIndex, cardIndex, tally } = this.props;
    let newTally = tally.map((bool, i) => {
      return (index === i && !bool);
    });
    onUpdate(ballotIndex, cardIndex, newTally);
  }

  checkRadioSelected() {
    let { tally } = this.props;
    return tally.filter(bool => bool).length > 0;
  }

  collapseToggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selected === true) {
      this.setState({ collapsed: false });
    }
  }

  render() {
    let {
      ballotIndex, cardIndex, title, secondary,
      poll, tally, onUpdate, click, children, className,
      next, selected,
      ...other } = this.props;

      console.log(level);
    return (
      <div className={classNames('ballot_card', { selected }, className)} {...other}>
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

        {(() => {

          if (this.state.collapsed) {
            return (
              <BallotChoice
                pollData={poll}
                pollTally={tally}
                click={() => {}}
              />
            );
          } else {
            return (
              <BallotPoll
                pollData={poll}
                pollTally={tally}
                pollSelectOption={this.pollSelectOption}
                click={click}
                president={title.join(' ').toUpperCase().indexOf('VICE PRE') > -1}
              />
            );
          }

        })()}

        { children }

        <div className={classNames('button_wrap', {
          visible: !this.state.collapsed
        })}>
          {(() => {
            if (this.checkRadioSelected()) {
              return <button className='small' onClick={this.collapseToggle}>Collapse</button>;
            }
          })()}
          <button className='small' onClick={(e) => {
            this.props.next(e);
            if (this.checkRadioSelected()) {
              this.collapseToggle();
            }
          }}>Next</button>
        </div>
      </div>
    );
  }
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
  selected: React.PropTypes.bool,
  next: React.PropTypes.func,
  children: React.PropTypes.element
};

export default BallotCard;

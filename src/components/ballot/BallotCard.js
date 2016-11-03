import React, { Component } from 'react';
import classNames from 'classnames';
import BallotClickableText from './BallotClickableText';
import BallotChoice from './BallotChoice';

const BallotPoll = ({ pollData, pollTally, pollSelectOption, click, className, ...other }) => (
  <ul className={classNames('ballot_poll', className)}>
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
      deselect, selected,
      ...other } = this.props;

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
              />
            );
          }

        })()}

        { children }

        <div className={classNames('button_wrap', {
          visible: this.state.collapsed || this.checkRadioSelected() && !this.state.collapsed
        })}>
          <button onClick={this.collapseToggle}>Collapse</button>
          <button onClick={this.props.deselect}>Done</button>
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
  deselect: React.PropTypes.func,
  children: React.PropTypes.element
};

export default BallotCard;

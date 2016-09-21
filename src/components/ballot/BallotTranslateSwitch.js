import React from 'react';
import classNames from 'classnames';

const BallotTranslateSwitch = ({ es, translate, ...other }) => {

  let translateToEnglish = (e) => {
    e.stopPropagation();
    if (es) {
      translate(false);
    }
  }

  let translateToSpanish = (e) => {
    e.stopPropagation();
    if (!es) {
      translate(true);
    }
  }

  return (
    <div className="ballot_switch" {...other}>
      <div className={classNames('state', { active: !es })} onClick={translateToEnglish}><span>English</span></div>
      <div className={classNames('state', { active: es })} onClick={translateToSpanish}><span>Español</span></div>
    </div>
  );
};

BallotTranslateSwitch.propTypes = {
  es: React.PropTypes.bool.isRequired, // spanish
  translate: React.PropTypes.func.isRequired
};

export default BallotTranslateSwitch;

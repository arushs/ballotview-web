import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

const TabsSection = ({ view }) => (
  <section id="tabs">
    <div id="step_0" className="module_first">
      <span className="title">Get ready for election day Nov 8th, 2016:</span>
    </div>
    <Link to={`/rockthevote`} id="step_1" className={classNames('module', { active: (view === 1) })}>
      <span className="title">1. Register to vote</span>
      <span className="sub">with Rock the Vote</span>
    </Link>
    <Link to={`/`} id="step_2" className={classNames('module', { active: (view === 2) })}>
      <span className="title">2. Inspect the ballot</span>
      <span className="sub">with BallotView</span>
    </Link>
    <Link id="step_3" className={classNames('module', { active: (view === 3) })}>
      <span className="title">3. Find your voting booth</span>
      <span className="sub">Coming in November</span>
    </Link>
  </section>
);

TabsSection.propTypes = {
  view: React.PropTypes.number
};

export default TabsSection;

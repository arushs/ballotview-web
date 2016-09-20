import React from 'react';
// import { Link } from 'react-router';

const SidebarSection = () => (
  <section id="side">
    <div id="step_0" className="module_first">
      <span className="title">Get ready for election day:</span>
    </div>
    <div id="step_1" className="module">
      <span className="title">1. Register to vote</span>
      <span className="sub">with Rock the Vote</span>
    </div>
    <div id="step_2" className="module active">
      <span className="title">2. Inspect the ballot</span>
      <span className="sub">with BallotView</span>
    </div>
    <div id="step_3" className="module">
      <span className="title">3. Find your voting booth</span>
      <span className="sub">Coming in November</span>
    </div>
  </section>
);

export default SidebarSection;

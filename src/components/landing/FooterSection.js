import React from 'react';
import classNames from 'classnames';

import EnterAddress from './EnterAddress';

const content = {
  heading: 'Get ready for the 2016 US election today.',
  blurb: 'This tool is nonpartisan, anonymized, and completely free.'
};

const links = {
  gsf: (<a href="https://www.globalshapers.org/">Global Shapers Community</a>),
  usc: (<a href="http://usc.edu">University of Southern California</a>),
  cla: (<a href="https://lacounty.gov">County of Los Angeles</a>)
};

const FooterSection = () => (
  <footer>

    <div className="heading"><span>{content.heading}</span></div>
    {/*<div className="blurb"><span>{content.blurb}</span></div>*/}

    <EnterAddress />

    <div className="logo_img"><img src="/dist/images/ballotview-black.png" /></div>

    <div className="credits_left">In parnership with the {links.gsf}, the {links.usc}, and the {links.cla}.</div>
    <div className="credits_right"><a href="#">Privacy Policy</a></div>
  </footer>
);

export default FooterSection;

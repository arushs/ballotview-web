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
function openFB(to) {
  window.open("https://www.facebook.com/ballotview");
}

const FooterSection = () => (
  <footer>
  <div>
    <div className="large"><span>Frequently Asked Questions</span></div>
  </div>
  <ul>
    <li>
      <div className="medium left">
      Can I vote on BallotView?
      </div>
      <div className="small left ">
        No, BallotView is a tool for voters to get informed and preview their ballot before the election. Our sharing feature makes it easy to get others informed as well. We also provide your voting location based on the address you enter.
      </div>
    </li>
    <br />
    <li>
      <div className="medium left">
        Why isn't my ballot displaying after I entered my address?
      </div>
      <div className="small left ">
        While our site works for the majority of addresses in the United States, we don't have access to the ballot information for all locations. We guarantee full functionality for LA County, and variable functionality throughout the rest of the country. For more information on our availability, simply test additional addresses or email us at contact@ballotview.org.
      </div>
    </li>
    <br />
    <li>
      <div className="medium left">
        Can other people access my voting choices?
      </div>
      <div className="small left ">
        We don't store any of your personal information. People can only see your voting preferences if you share a receipt of you voting preferences on Facebook or with others via the link we provide for sharing.
      </div>
    </li>
    <br />
    <li>
      <div className="medium left">
        I love BallotView, how can I help?
      </div>
      <div className="small left ">
        Like us on Facebook, Follow us on Twitter, and Share BallotView with your friends and family! Our main goal is to put this tool in the hands of as many voters as possible. We also have a GoFundMe to help us pay for upkeep and advertise. Every donation helps : https://www.gofundme.com/7t49nu3k
      </div>
    </li>
    <br />
  </ul>

  <button onClick={openFB}>Like us on Facebook</button>
  <div className="logo_img"><img src="/dist/images/ballotview-black.png" /></div>
  <div className=" center">In parnership with the {links.gsf}, the {links.usc}, and the {links.cla}.</div>
  </footer>
);

export default FooterSection;

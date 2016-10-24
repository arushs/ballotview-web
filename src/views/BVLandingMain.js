import React, { Component } from 'react';
import MainSection from '../components/landing/MainSection';
import TabsSection from '../components/landing/TabsSection';
import DetailSection from '../components/landing/DetailSection';
import RockTheVoteSection from '../components/landing/RockTheVoteSection';

import FooterSection from '../components/landing/FooterSection';
import api from '../api-interface';

const Landing = ({ view }, { router }) => (
  <main id="landing">
    <TabsSection view={2}/>
    <div>
      <MainSection />
      <DetailSection />
    </div>
    <FooterSection />
  </main>
);

Landing.contextTypes = {
  router: React.PropTypes.object.isRequired
};

Landing.propTypes = {
  view: React.PropTypes.number
};

export default Landing;

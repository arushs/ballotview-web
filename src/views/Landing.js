import React, { Component } from 'react';
import MainSection from '../components/landing/MainSection';
import TabsSection from '../components/landing/TabsSection';
import DetailSection from '../components/landing/DetailSection';
import RockTheVoteSection from '../components/landing/RockTheVoteSection';

import FooterSection from '../components/landing/FooterSection';
import api from '../api-interface';

const Landing = ({ view }) => (
  <main id="landing">
    <TabsSection view={view}/>
    {(() => {
      if (view === 1) {
        return (
          <RockTheVoteSection />
        );
      } else {
        return (
          <div>
            <MainSection />
            <DetailSection />
          </div>
        );
      }
    })()}
    <FooterSection />
  </main>
);

Landing.propTypes = {
  view: React.PropTypes.number
};

export default Landing;

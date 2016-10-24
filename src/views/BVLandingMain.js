import React, { Component } from 'react';
import Cookies from 'js-cookie';

import MainSection from '../components/landing/MainSection';
import TabsSection from '../components/landing/TabsSection';
import DetailSection from '../components/landing/DetailSection';
import RockTheVoteSection from '../components/landing/RockTheVoteSection';

import FooterSection from '../components/landing/FooterSection';
import api from '../api-interface';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let write_id = Cookies.get('write_id');
    if (write_id) {
      this.context.router.push({
        pathname: '/ballot/' + write_id
      });
    }
  }

  render() {
    return (
      <main id="landing">
        {/*<TabsSection view={2}/>*/}
        <div>
          <MainSection />
          <DetailSection />
          <FooterSection />
        </div>
      </main>
    )
  }
}

Landing.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Landing;

import React, { Component } from 'react';
import Cookies from 'js-cookie';

import MainSection from '../components/landing/MainSection';
// import TabsSection from '../components/landing/TabsSection';
import DetailSection from '../components/landing/DetailSection';
import FooterSection from '../components/landing/FooterSection';
import RockTheVoteSection from '../components/landing/RockTheVoteSection';
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
    const content = {
      message: 'Voting should be easy',
      blurb: 'Access detailed, nonpartisan ballot content about each candidate and issue so that you know what you\'re voting for',
      prompt: 'Enter your full address below to get started:',
      prompt2: '(We\'ll match you to the right ballot.)'
    };

    return (
      <main id="landing">
        {/*<TabsSection view={2}/>*/}
        <MainSection content={content} />
        <DetailSection />
        <FooterSection />
      </main>
    )
  }
}

Landing.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Landing;

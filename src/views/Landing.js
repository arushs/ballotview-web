import React, { Component } from 'react';
import MainSection from '../components/landing/MainSection';
import SidebarSection from '../components/landing/SidebarSection';
import api from '../api-interface';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailIsValid: false
    };
    this.onUpdateEmail = this.onUpdateEmail.bind(this);
  }

  onUpdateEmail(e) {
    this.setState({
      email_collect: e.target.value
    }, () => {
      // check if email is valid
    });
  }

  onSubmitEmail() {
    if (this.state.email_is_valid) {
      // handle submit
    }
  }

  render() {
    return (
      <main id="landing">
        <MainSection
          email={this.state.email}
          emailIsValid={this.state.emailIsValid}
          onUpdateEmail={this.onUpdateEmail}
        />
        <SidebarSection />
      </main>
    );
  }
}

export default Landing;

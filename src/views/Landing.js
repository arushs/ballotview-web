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
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
  }

  onUpdateEmail(e) {
    this.setState({
      email: e.target.value
    }, () => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.state.emailIsValid = re.test(this.state.email);
    });
  }

  onSubmitEmail() {
    if (this.state.email_is_valid) {
      api.submitEmail(this.state.email).then((data) => { console.log(data); }).catch(() => {});
    }
  }

  render() {
    return (
      <main id="landing">
        <MainSection
          email={this.state.email}
          emailIsValid={this.state.emailIsValid}
          onUpdateEmail={this.onUpdateEmail}
          onSubmitEmail={this.onSubmitEmail}
        />
        <SidebarSection />
      </main>
    );
  }
}

export default Landing;

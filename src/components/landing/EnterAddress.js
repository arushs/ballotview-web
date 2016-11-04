import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import api from '../../api-interface';
import _ from 'lodash';

const exampleAddress = 'e.g., 200 N Spring St, Los Angeles, CA 90012';
const error_message = 'Sorry, could not retrieve ballot for specified address. Please try again';

class EnterAddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      address_components: {},
      addressIsValid: false,
      isCreating: false,
      error: false,
      redirect: {}
    };
    this.setConstants(props.preSubmit, props.postSubmit);
    this.onUpdateAddress = this.onUpdateAddress.bind(this);
    this.onCheckSubmit = this.onCheckSubmit.bind(this);
    this.onPlaceSelected = this.onPlaceSelected.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setConstants(newProps.preSubmit, newProps.postSubmit);
  }

  setConstants(preSubmit, postSubmit) {
    this.constants = {
      preSubmit: preSubmit || 'Access Ballot',
      postSubmit: postSubmit || 'Accessing...'
    };
  }

  render() {
    let { address, addressIsValid, isCreating } = this.state;
    let { onUpdateAddress, onPlaceSelected, onCheckSubmit, onSubmit } = this;
    return (
      <div className="enter_address">
        <Autocomplete
          ref="address"
          type="text"
          className="address"
          placeholder={exampleAddress}
          onPlaceSelected={onPlaceSelected}
          value={address}
          onChange={onUpdateAddress}
          onKeyDown={onCheckSubmit}
          disabled={isCreating}
          types={['geocode']}
        />
        {(() => {
          if (this.state.error) {
            return (
              <div className="error">
                <span>{error_message}</span>
              </div>
            );
          }
        })()}
        <button
          disabled={!addressIsValid || isCreating}
          onClick={onSubmit}
        >{(!isCreating) ? 'Access Ballot' : 'Accessing...'}
        </button>
      </div>
    );
  }

  onUpdateAddress(e) {
    this.setState({
      address: e.target.value,
      address_components: {},
      addressIsValid: false,
      error: false
    });
  }

  onPlaceSelected(place) {
    if ('formatted_address' in place) {
      var address_components = {};

      for (var comp of place.address_components) {
        address_components[comp.types[0]] = comp.short_name;
      }

      this.setState({
        address: place.formatted_address,
        address_components: address_components,
        addressIsValid: true
      });
    }
  }

  onCheckSubmit(e) {
    if (e.keyCode === 13 && this.state.addressIsValid) {
      this.onSubmit();
    }
  }

  onSubmit() {
    let _this = this;
    let { addressIsValid, isCreating, address, address_components } = this.state;

    if (addressIsValid && !isCreating) {
      this.setState({ isCreating: true });
      api.createBallot(address, address_components)
        .then(function (res) {
          if ('error' in res.body) {
            submitError();
          } else {
            return _this.setState({ redirect: {
              pathname: '/ballot/' + res.body.write_id,
              state: res.body,
            } });
          }
        }).catch(submitError);
    }

    function submitError() {
      _this.setState({
        error: true,
        isCreating: false,
        address_components: {},
        addressIsValid: false
      });
    }
  }

  componentWillUpdate(newProps, newState) {
    if (!_.isEmpty(newState.redirect)) {
      this.context.router.push(newState.redirect);
    }
  }

}

EnterAddress.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default EnterAddress;

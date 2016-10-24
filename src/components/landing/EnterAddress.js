import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import api from '../../api-interface';

const exampleAddress = 'e.g., 200 N Spring St, Los Angeles, CA 90012';
const error_message = 'Sorry, could not retrieve ballot for specified address. Please try again';

class EnterAddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      addressIsValid: false,
      isCreating: false,
      error: false
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
      addressIsValid: false,
      error: false
    });
  }

  onPlaceSelected(place) {
    if ('formatted_address' in place) {
      this.setState({
        address: place.formatted_address,
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
    let { addressIsValid, isCreating, address } = this.state;

    if (addressIsValid && !isCreating) {
      this.setState({ isCreating: true });
      api.createBallot(address)
        .then(function (res) {
          if ('error' in res.body) {
            _this.setState({
              error: true,
              isCreating: false,
              addressIsValid: false
            });
          } else {
            _this.context.router.push({
              pathname: '/ballot/' + res.body.write_id,
              state: res.body,
            });
          }
        });
    }
  }

}

EnterAddress.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default EnterAddress;

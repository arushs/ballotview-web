import React, { Component } from 'react';
import Clipboard from 'clipboard';

class CopyableLink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }

  render() {
    let { children } = this.props;

    return (<span>
      <span
        className='copiable'
        ref='select'
        onClick={this.selectText.bind(this)}>
        {children}
      </span>
      {(() => {
        if (this.state.copied) {
          return <span className="copied">Copied!</span>;
        }
      })()}
    </span>);
  }

  componentDidMount() {
    let _this = this;
    this.clipboard = new Clipboard(this.refs.select, {
      text: trigger => {
        _this.setState({ copied: true }, () => {
          setTimeout(() => {
            _this.setState({ copied: false });
          }, 3000);
        })
        return this.props.toCopy || this.props.children.join('');
      }
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  selectText() {
    var doc = document;
    var text = this.refs.select;

    if (doc.body.createTextRange) { // ms
      var range = doc.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) { // moz, opera, webkit
      var selection = window.getSelection();
      var range = doc.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

}

export default CopyableLink;

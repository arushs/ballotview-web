import React, { Component } from 'react';

import Copy from './CopyableLink';

function convertToUri(data) {
  return Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
}

export default ({ id, onClose }) => {

  let receiptUrl = 'www.ballotview.org' + '/receipt/' + id;

  let shareOnFacebook = () => {
    let params = {
      app_id: 1839751826257197,
      display: 'popup',
      href: receiptUrl,
      hashtag: '#BallotView'
    };
    window.open('https://www.facebook.com/dialog/share?' + convertToUri(params));
  };

  let shareOnTwitter = () => {
    let params = {
      url: receiptUrl,
      via: 'ballotview',
      hashtags: 'voting,election2016',
      text: 'This is who I\'m voting for: '
    };
    window.open('https://twitter.com/share?' + convertToUri(params));
  };

  return (
    <section id="modal">
      <div className="close" onClick={onClose}>×</div>
      <div><b>Share your receipt (read-only).</b></div>
      <div>You can share a receipt of your choices to your friends using this non-editable link:</div>
      <div><Copy toCopy={'http://' + receiptUrl}>{receiptUrl}</Copy></div>
      <br />
      <div>Share it on social media:</div>
      <div>
        <button onClick={shareOnFacebook}>Facebook</button>
        <button onClick={shareOnTwitter}>Twitter</button>
      </div>
    </section>
  );
};

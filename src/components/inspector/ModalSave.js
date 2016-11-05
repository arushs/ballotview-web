import React, { Component } from 'react';

import Copy from './CopyableLink';

function printExternal(url) {
    var printWindow = window.open( url, 'Print', 'left=200, top=200, width=950, height=500, toolbar=0, resizable=0');
    printWindow.addEventListener('load', function(){
        printWindow.print();
        // printWindow.close();
    }, true);
}

export default ({ write_id, read_id, onClose }) => {

  let ballotUrl = 'www.ballotview.org' + '/ballot/' + write_id;
  let receiptUrl = 'www.ballotview.org' + '/receipt/' + read_id;

  function convertToUri(data) {
    return Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
  }

  let shareOnFacebook = () => {
    let params = {
      app_id: 1839751826257197,
      display: 'popup',
      href: receiptUrl,
      hashtag: '#BallotView'
    };
    window.open('https://www.facebook.com/dialog/share?' + convertToUri(params));
  };

  return (
    <section id="modal">
      <div className="close" onClick={onClose}>×</div>
      <div><b>Save your ballot.</b></div>
      <div>Make sure to save this link so you can come back to your ballot later. (<u>Do not share</u> this link to others. This link will allow you to edit your choices):</div>
      <div><Copy toCopy={'http://' + ballotUrl}>{ballotUrl}</Copy></div>
      <br />
      {/* <div>Send this ballot to yourself via <u>Facebook Messenger</u> (includes a receipt):</div>
      <div>
        <button>Send to Facebook Messenger</button>
      </div> */}

      {/* <hr /> */}

      <div><b>Share your receipt (read-only).</b></div>
      <div>You can share a receipt of your choices to your friends using this non-editable link:</div>
      <div><Copy toCopy={'http://' + receiptUrl}>{receiptUrl}</Copy></div>
      <br />
      <div>
        <button onClick={shareOnFacebook}>Share to Facebook</button>
        <button onClick={() => {printExternal('http://' + receiptUrl)}}>Print</button>
        {/*<button onClick={shareOnTwitter}>Twitter</button>*/}
      </div>
    </section>
  );
};

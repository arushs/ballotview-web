import React, { Component } from 'react';

import Copy from './CopyableLink';

// function openGoogleMaps(from, to) {
//   var url = 'https://maps.google.com/?daddr=' + encodeURI(to) + '&saddr=' + encodeURI(from);
//   window.open(url);
// }

function openGoogleMaps(to) {
  var url = 'https://maps.google.com/?daddr=' + encodeURI(to);
  window.open(url);
}

export default ({ polling_location, onClose }) => {

  let { address, directions, polling_hours } = polling_location;

  let one_line = address.line1 + ' ' + address.city + ', ' + address.state + ' ' + address.zip;

  return (
    <section id="modal">
      <div className="close" onClick={onClose}>×</div>
      <div><b>Where do I go to vote?</b></div>
      <div className="address">
        <div className="location_name">{address.location_name}</div>
        <div className="line1">{address.line1}</div>
        <div className="line2">{address.city}, {address.state} {address.zip}</div>
      </div>
      {/*<br />*/}
      <div className="notes">
        <div>Note: {directions}</div>
        <div>Hours: {polling_hours}</div>
      </div>
      <br />
      <div>
        <button className="small" onClick={() => {openGoogleMaps(one_line);}}>Get Directions</button>
      </div>
    </section>
  );
};

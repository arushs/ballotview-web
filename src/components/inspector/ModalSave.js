import React, { Component } from 'react';

import Copy from './CopyableLink';

export default ({ id, onClose }) => (
  <section id="modal">
    <div className="close" onClick={onClose}>×</div>
    <div><b>Save your ballot.</b></div>
    <div>Make sure to save this link so you can come back to your ballot later. (<u>Do not share</u> this link to others. This link will allow you to edit your choices):</div>
    <div><Copy>{window.location.origin}/ballot/{id}</Copy></div>
    <br />
    <div>You can also send this ballot to yourself via <u>Facebook Messenger</u> (includes a receipt):</div>
    <div>
      <button>Send to Facebook Messenger</button>
    </div>
  </section>
);

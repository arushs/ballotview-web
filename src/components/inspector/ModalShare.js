import React, { Component } from 'react';

import Copy from './CopyableLink';

export default ({ id, onClose }) => (
  <section id="modal">
    <div className="close" onClick={onClose}>×</div>
    <div><b>Share your receipt (read-only).</b></div>
    <div>You can share a receipt of your choices to your friends using this non-editable link:</div>
    <div><Copy>{window.location.origin}/receipt/{id}</Copy></div>
    <br />
    <div>Share it on social media:</div>
    <div>
      <button>Facebook</button>
      <button>Twitter</button>
    </div>
  </section>
);

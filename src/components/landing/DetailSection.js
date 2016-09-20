import React from 'react';

import BallotCard from '../ballot/BallotCard';

const DetailSection = ({ email, emailIsValid, onUpdateEmail, onSubmitEmail }) => (
  <section id="detail">
      <BallotCard />
  </section>
);

export default DetailSection;

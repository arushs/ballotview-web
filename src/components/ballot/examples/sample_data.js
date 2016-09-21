const party = {
  dem: '#0D47A1',
  rep: '#B71C1C',
  lib: '#F57F17',
  gre: '#558B2F'
}

const presidential = {
  title: ['I. ', { text: 'President and Vice President of the United States', click: true }],
  secondary: ['Vote for 1 pair'],
  poll: [{
    info: [{
      title: [{ text: 'Hilary Clinton', click: true }],
      sub: ['for ', { text: 'President', click: true }]
    }, {
      title: [{ text: 'Tim Kaine', click: true }],
      sub: ['for ', { text: 'Vice President', click: true }]
    }],
    trail: [{ text: 'Democrat', click: true }],
    color: party.dem
  }, {
    info: [{
      title: [{ text: 'Donald Trump', click: true }],
      sub: ['for ', { text: 'President', click: true }]
    }, {
      title: [{ text: 'Mike Pence', click: true }],
      sub: ['for ', { text: 'Vice President', click: true }]
    }],
    trail: [{ text: 'Republican', click: true }],
    color: party.rep
  }, {
    info: [{
      title: [{ text: 'Gary Johnson', click: true }],
      sub: ['for ', { text: 'President', click: true }]
    }, {
      title: [{ text: 'William Weld', click: true }],
      sub: ['for ', { text: 'Vice President', click: true }]
    }],
    trail: [{ text: 'Libertarian', click: true }],
    color: party.lib
  }, {
    info: [{
      title: [{ text: 'Jill Stein', click: true }],
      sub: ['for ', { text: 'President', click: true }]
    }, {
      title: [{ text: 'Ajamu Baraka', click: true }],
      sub: ['for ', { text: 'Vice President', click: true }]
    }],
    trail: [{ text: 'Green', click: true }],
    color: party.gre
  }]
};

const senator = {
  title: ['II. ', { text: 'US Senator, California', click: true }],
  secondary: ['Vote for 1'],
  poll: [{
    info: [{
      title: [{ text: 'Kamala Harris', click: true }]
    }],
    trail: [{ text: 'Democrat', click: true }],
    color: party.dem
  }, {
    info: [{
      title: [{ text: 'Loretta Sanchez', click: true }]
    }],
    trail: [{ text: 'Democrat', click: true }],
    color: party.dem
  }]
};

const prop51 = {
  title: [{ text: 'California Proposition 51', click: true }, ', ', 'Public School Facility Bonds'],
  secondary: [{ text: 'Education', click: true }, '. ', { text: 'CISS', click: true }, '. ', '$9 billion in bonds for education and schools.'],
  poll: [{
    info: [{
      title: [{ text: 'Yes', click: true }]
    }, {
      sub: ['A "yes" vote supports the state issuing $9 billion in bonds to fund improvement and construction of school facilities for K-12 schools and community colleges.']
    }]
  }, {
    info: [{
      title: [{ text: 'No', click: true }]
    }, {
      sub: ['A "no" vote opposes the state issuing $9 billion in new debt to fund the improvement and construction of education facilities.']
    }]
  }]
};

const prop52 = {
  title: [{ text: 'California Proposition 52', click: true }, ', ', 'Voter Approval to Divert Hospital Fee Revenue Dedicated to Medi-Cal'],
  secondary: [{ text: 'Healthcare', click: true }, '. ', { text: 'CICA/SS', click: true }, '. ', 'Voter approval of changes to the hospital fee program.'],
  poll: [{
    info: [{
      title: [{ text: 'Yes', click: true }]
    }, {
      sub: ['A "yes" vote supports requiring voter approval to change the dedicated use of certain fees from hospitals used to draw matching federal money and fund Medi-Cal services. The initiative was also designed to require a two-thirds majority vote of the California Legislature to end the hospital fee program.']
    }]
  }, {
    info: [{
      title: [{ text: 'No', click: true }]
    }, {
      sub: ['A "no" vote opposes this initiative, allowing the legislature to change, extend, or eliminate the hospital fee program with a majority vote.']
    }]
  }]
};

export default [presidential, senator, prop51, prop52];

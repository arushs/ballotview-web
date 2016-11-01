const losAngelesCounty = require('./../src/server/controllers/losAngelesCounty');

const test_address = {
  number: '3131',
  street_name: 'Figueroa',
  zip: '90089'
};

losAngelesCounty(test_address)
  .then(console.log)
  .catch(console.error);

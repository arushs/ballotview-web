const losAngelesCounty = require('./../src/server/controllers/losAngelesCounty');

const test_address = {
  number: '3131',
  city: 'Los Angeles',
  street_name: 'McClintock',
  zip: '90007'
};

losAngelesCounty(test_address).then(console.log);

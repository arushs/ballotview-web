const db = require('./firebase');
const Promise = require('bluebird');

// get firebase ref
var laRef = db.ref('la_county');

function precinct(address) {
  return new Promise(function (resolve, reject) {

    function normalizeAddress(address) {
      return new Promise(function (resolve, reject) {
        resolve({
          number: address.number,
          street_name: address.street_name.toUpperCase(),
          zip: address.zip
        });
      });
    }

    function findPrecinctFromAddress(address) {
      // grab info
      var zip = address.zip,
          street_name = address.street_name,
          number = address.number;

      // perform search
      return new Promise(function (resolve, reject) {
        var time = Date.now();
        laRef.child('street_segment')
          .child(zip)
          .child(street_name.replace('.', ' ').split(' ')[0])
          .once('value')
          .then(function (snap) {
            if (snap.hasChildren()) {
              // console.log(Date.now() - time);
              var results = snap.val();
              for (var key in results) {
                var odd_even = results[key].odd_even_both;
                var odd_bool = (odd_even == 'Odd' && parseInt(number) % 2 == 1);
                var even_bool = (odd_even == 'Even' && parseInt(number) % 2 == 0);
                var both_bool = (odd_even == 'Both');
                if (number >= results[key].start_house_number
                  && number <= results[key].end_house_number
                  && (odd_bool || even_bool || both_bool)) {

                  // console.log(Date.now() - time);
                  resolve(results[key].precinct_id);
                }
              }
              reject(new Error('no precinct found from address'));
            } else {
              reject(new Error('no precinct found from address'));
            }
          }).catch(reject);
      });
    }

    function getPrecinctData(precinct_id) {
      return new Promise(function (resolve, reject) {
        laRef.child('precinct')
          .child(precinct_id)
          .once('value')
          .then(function (snap) {
            if (snap.exists()) {
              resolve(snap.val());
            } else {
              reject(new Error('precinct does not exist'));
            }
          }).catch(reject);
      });
    }

    normalizeAddress(address)
      .then(findPrecinctFromAddress)
      .catch(reject)
      .then(getPrecinctData)
      .catch(reject)
      .then(resolve)
      .catch(reject);
  });
}

module.exports.precinct = precinct;

function electoral(elec_id) {
  return new Promise(function (resolve, reject) {
    laRef.child('contest')
      .child(elec_id)
      .once('value')
      .then(function (snap) {
        if (snap.exists()) {
          resolve(snap.val());
        } else {
          reject(new Error('electoral does not exist'));
        }
      }).catch(reject);
  });
}

module.exports.electoral = electoral;

function polling_location(poll_loc_id) {
  return new Promise(function (resolve, reject) {
    laRef.child('polling_location')
      .child(poll_loc_id)
      .once('value')
      .then(function (snap) {
        if (snap.exists()) {
          resolve(snap.val());
        } else {
          reject(new Error('polling_location does not exist'));
        }
      }).catch(reject);
  });
}

module.exports.polling_location = polling_location;

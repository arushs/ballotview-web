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
          city: address.city.toUpperCase(),
          street_name: address.street_name.toUpperCase(),
          zip: address.zip
        });
      });
    }

    function findPrecinctFromAddress(address) {
      // grab info
      var zip = address.zip,
          city = address.city,
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
                if (number >= results[key].start_house_number && number <= results[key].end_house_number) {
                  // console.log(Date.now() - time);
                  resolve(results[key].precinct_id);
                  break;
                }
              }
            } else {
              reject();
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
              reject();
            }
          }).catch(reject);
      });
    }

    normalizeAddress(address)
      .then(findPrecinctFromAddress)
      .error(reject)
      .then(getPrecinctData)
      .error(reject)
      .then(resolve)
      .error(reject);
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
          reject();
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
          reject();
        }
      }).catch(reject);
  });
}

module.exports.polling_location = polling_location;

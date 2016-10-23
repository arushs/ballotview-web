import Promise from 'bluebird';
// import _ from 'lodash';

const request = require('request');

const methods = {};


// Params:
// reqUrl: URL to request from (/email/submit)
// verb: POST, PUT, GET, etc.
// data: JSON Data
function interfacer(reqUrl, verb, data) {
  return new Promise((resolve, reject) => {
    const requestUrl = window.location.origin + reqUrl;
    buffer();
    function buffer() {
      var req = request({
        uri: requestUrl,
        method: verb,
        json: true,
        body: data
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(response);
        } else {
          console.log(error);
          reject(response);
        }
      });
    }
  });
}

methods.submitEmail = function (emailAddr) {
  return new Promise((resolve, reject) => {
    let data = { email: emailAddr };
    interfacer('/email/submit', 'post', data)
      .then(resolve).error(reject);
  });
};

methods.createBallot = function (address) {
  return new Promise((resolve, reject) => {
    let data = { address };
    interfacer('/ballot/create', 'post', data)
      .then(resolve).error(reject);
  });
};

methods.getWritableBallot = function (bvId) {
  return new Promise((resolve, reject) => {
    let data = { };
    interfacer('/ballot/write/' + bvId, 'get', data)
      .then(resolve).error(reject);
  });
};

methods.updateWriteableBallot = function (bvId, newTally) {
  return new Promise((resolve, reject) => {
    let data = { tallies: newTally };
    interfacer('/ballot/write/' + bvId, 'put', data)
      .then(resolve).error(reject);
  });
}

methods.getReadOnlyBallot = function(bvId) {
  return new Promise((resolve, reject) => {
    let data = { };
    interfacer('/ballot/read/' + bvId, 'get', data)
      .then(resolve).error(reject);
  });
};

export default methods;

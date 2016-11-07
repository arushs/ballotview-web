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
    return buffer();
    function buffer() {
      var req = request({
        uri: requestUrl,
        method: verb,
        json: true,
        body: data,
        qs: data
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        } else if(response.statusCode !== 200) {
          return reject(new Error(body.error));
        } else {
          return resolve(response);
        }
      });
      return req;
    }
  });
}

methods.submitEmail = function (emailAddr) {
  return new Promise((resolve, reject) => {
    let data = { email: emailAddr };
    return interfacer('/email/submit', 'post', data)
      .then(resolve)
      .catch(reject);
  });
};

methods.createBallot = function (address, address_components) {
  return new Promise((resolve, reject) => {
    let data = { address, address_components };
    return interfacer('/ballot/create', 'post', data)
      .then(resolve)
      .catch(reject);
  });
};

methods.getWritableBallot = function (bvId) {
  return new Promise((resolve, reject) => {
    let data = { };
    return interfacer('/ballot/write/' + bvId, 'get', data)
      .then(resolve)
      .catch(reject);
  });
};

methods.updateWriteableBallot = function (bvId, newTally) {
  return new Promise((resolve, reject) => {
    let data = { tallies: newTally };
    return interfacer('/ballot/write/' + bvId, 'put', data)
      .then(resolve)
      .catch(reject);
  });
}

methods.getReadOnlyBallot = function(bvId) {
  return new Promise((resolve, reject) => {
    let data = { };
    return interfacer('/ballot/read/' + bvId, 'get', data)
      .then(resolve)
      .catch(reject);
  });
};

methods.searchCandidate = function(query) {
  return new Promise((resolve, reject) => {
    let data = { query: query };
    return interfacer('/ballot/content/candidate', 'get', data)
      .then(resolve)
      .catch(reject);
  });
}

methods.searchReferendum = function(query, state) {
  return new Promise((resolve, reject) => {
    let data = { query: query, state: state };
    return interfacer('/ballot/content/referendum', 'get', data)
      .then(resolve)
      .catch(reject);
  });
}

export default methods;

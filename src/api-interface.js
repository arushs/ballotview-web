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
    const requestUrl = window.location.href + 'api' + reqUrl;
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
    let data = {
      email: emailAddr
    };
    interfacer('/email/submit', 'post', data)
    .then((response) => {
      resolve(response);
    }).error((response) => {
      reject(response);
    });
  });
};

export default methods;

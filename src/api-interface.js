import Promise from 'bluebird';
// import _ from 'lodash';

const request = require('request');

const methods = {};

function interfacer(reqUrl, verb, queries = {}) {
  let queriesString = '';
  for (let key in queries) {
    if ({}.hasOwnProperty.call(queries, key)) {
      queriesString += '&${key}={queries[key]}';
    }
  }

  return new Promise((resolve, reject) => {
    const requestUrl = 'http://localhost:3000/api' + reqUrl;
    buffer();
    function buffer() {
      request({
        uri: '/api' + requestUrl + '?' + queriesString,
        method: 'get'
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    }
  });
}

// methods.verify = function (courseId, term) {
//   return new Promise((resolve, reject) => {
//     let courseId2 = courseId.split('-');
//     if (courseId2.length !== 2) resolve(false);

//     let dept = courseId2[0];
//     let num = courseId2[1].slice(0, 3);
//     let seq = courseId2[1].slice(3);

//     interfacer('TROJAN', 'course', { dept, num, seq, term }).then((data) => {
//       resolve(!(_.isUndefined(data[courseId])));
//     }).error(reject);
//   });
// };

methods.submitEmail = function () {
  return new Promise((resolve, reject) => {
    interfacer('/email/submit', 'post', {}).then((data) => {
      resolve(data);
    }).error(reject);
  });
};

export default methods;

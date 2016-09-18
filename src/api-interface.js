// import ajax from 'reqwest';
// import Promise from 'bluebird';
// import _ from 'lodash';

// let methods = {};

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

// methods.generateSchedules = function (courses = []) {
//   return new Promise((resolve, reject) => {
//     interfacer('method', 'generateSchedules', { courses }).then((data) => {
//       resolve(data);
//     }).error(reject);
//   });
// };

// export default methods;

// function interfacer(method, action, queries = {}) {
//   let queriesString = '';
//   for (let key in queries) {
//     queriesString += '&' + key + '=' + queries[key];
//   }

//   return new Promise((resolve, reject) => {
//     buffer();
//     function buffer() {
//       ajax({
//         url: '/api/' + method + '.' + action + '?' + queriesString,
//         method: 'get',
//         success: function (res) {
//           resolve(res);
//         },

//         error: function (err) {
//           console.error('ajax err:', err._url.href);
//           setTimeout(buffer, 200);
//         },
//       });
//     }
//   });
// };
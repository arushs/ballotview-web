const firebase = require('firebase');
const app = firebase.initializeApp({
  serviceAccount: "src/server/keys/BallotView-901eb47f4aa6.json",
  databaseURL: "https://ballotview-144106.firebaseio.com"
});
const db = firebase.database();
module.exports = db;

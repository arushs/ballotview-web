"use strict";

const express = require('express');
const Promise = require('bluebird');
const router = express.Router();
const request = require('request');
const shortid = require('shortid');
const _ = require('lodash');

const db = require('./firebase');
const parseGoogleCivic = require('./googlecivic');
const parseBallotpediaCandidate = require('./ballotpedia')
const losAngelesCounty = require('./losAngelesCounty');
const data = require('./data');

var bvRef = db.ref('ballotview');
var laRef = db.ref('la_county');
var candidatRef = db.ref('candidates');

const googleKey = 'AIzaSyChX3BTs57b15Q-rTx2nxwhazzJ4jpi2xQ';
const ballotpedia_url = "http://api.ballotpedia.org/v1/api.php?Key=1a9895801d0409ace45990a746d5d94b&DataSet=People";

function getGoogleCivicBallot(address) {
  return new Promise(function (resolve) {
    request({
      uri:'https://www.googleapis.com/civicinfo/v2/voterinfo',
      qs: {
        key: googleKey,
        address: address,
        electionId: 5000,
        returnAllAvailableData: true
      },
      method: 'get',
      json: true,
    }, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        return reject(new Error('could not get ballot from google'))
      } else {
        return resolve(parseGoogleCivic(body));
      }
    });
  });
}

function getIndividualCandidateData(value, j) {

  function parseCandidateFromBP(name, i, resolve, reject) {
    var nameArray = name.split(" ");
    var firstName = nameArray[0];
    var lastName = nameArray[nameArray.length - 1];
    var exists = false;
    candidatRef.child(firstName + " " + lastName)
      .once('value')
      .then(function (snap) {
        if (snap.exists()) {
          console.log("Exists");
          exists = true;
          return resolve(snap.val());
        } 
      });

    if (!exists) {
      console.log("Requesting");
      
      request({
        uri: ballotpedia_url + "&FirstName=" + firstName + "&LastName=" + lastName,
        method: 'get',
        json: true,
      }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
          return reject(new Error('could not get candidate from Ballotpedia'))
        } else {
          var data = parseBallotpediaCandidate(body);
          data.sortOrder = i;
          // firebase
          console.log("Requested");
          candidatRef.child(firstName + " " + lastName).set(data);
          return resolve(data);
        }
      });
    }
  }

  return new Promise(function (resolve, reject) {
    // If [Hillary Clinton, Tim Kaine]
    if (value.constructor === Array) {
      var toRet = [];
      for (var i in value) {
        var name = value[i];
        parseCandidateFromBP(name, i, function (data) {
          toRet.push(data);
          if (toRet.length === value.length) {
            resolve({ sortOrder: j, data: _.sortBy(toRet, ['sortOrder']) });
          }
        }, reject);
      }
      // Else, value = Kamala Harris
    } else {
      parseCandidateFromBP(value, 0, function (data) {
        resolve({ sortOrder: j, data: data });
      }, reject);
    }
  })
}

function getCandidateData(query) {
  // Check if in firebase and get data if so


  // If not in firebase
  return new Promise(function (resolve, reject) {
    var ret = [];
    var promiseFinished = 0;
    for (var i in query) {
      console.log("Query is: " + query[i]);
      getIndividualCandidateData(query[i], i)
        .then(function (data) {
          ret.push(data);
          if (ret.length === query.length) {
            resolve(_.sortBy(ret, ['sortOrder']).map(function (obj) {
              return obj.data; 
            }));
          }
        }).catch (reject);
    }
  });
}


router.get('/', function (req, res) {

  if ('zip' in req.query && 'street_name' in req.query && 'number' in req.query) {
    let address = {
      number: req.query.number,
      street_name: req.query.street_name,
      zip: req.query.zip
    };

    losAngelesCounty(address)
      .then(function(data) { res.json(data); })
      .catch(function(error) {
        return res.status(400).send({ error: error.message });
      });
  } else if ('address' in req.query){
    getGoogleCivicBallot(req.query.address)
      .then(function(data) { res.json(data); })
      .catch(function(error) {
        return res.status(400).send({ error: error.message });
      });
  } else {
    return res.status(400).send({ error: 'parameters incorrect' });
  }
});

router.route('/create')
  .post(function (req, res) {
    var ballots = bvRef.child('ballots');
    var zip_la = laRef.child('street_segment');
    var address = req.body.address;
    var address_components = req.body.address_components;
    // console.log(address);
    var bvWriteId = shortid.generate();
    var bvReadId = shortid.generate();

    if ('postal_code' in address_components) {
      zip_la.orderByKey()
        .equalTo(address_components.postal_code)
        .once('value')
        .then(function (snap) {
          if (snap.exists()) {
            useLosAngelesCounty();
          } else {
            useGoogleCivic();
          }
        }).catch(function (error) {
          return res.status(400).send({ error: error.message });
        });
    } else {
      return res.status(400).send({ error: 'no postal code received' });
    }

    function useLosAngelesCounty() {
      var laAddress = {
        number: address_components.street_number,
        street_name: address_components.route,
        zip: address_components.postal_code
      };
      var dir = ['N', 'E', 'W', 'S', 'NE', 'EW', 'NW', 'WN', 'NS', 'SN', 'EW', 'WE', 'ES', 'SE', 'WS', 'SW'];
      var st_name_split = laAddress.street_name.split(' ');
      var first = st_name_split[0];
      var second = st_name_split[1];
      if (first.length <= 2 && dir.indexOf(first) > -1) {
        laAddress.street_name = second;
      } else {
        laAddress.street_name = first;
      }
      losAngelesCounty(laAddress)
        .then(processData)
        .catch(function(error) {
          return res.status(400).send({ error: error.message });
        });
    }

    function useGoogleCivic() {
      getGoogleCivicBallot(address)
        .then(processData)
        .catch(function(error) {
          console.error(error.message);
          return res.status(400).send({ error: error.message });
        });
    }

    function processData(data) {
      // console.log(data);
      if ('error' in data) {
        return res.status(400).send({ error: 'could not grab ballot info.' });
      } else {
        var heading = data.heading;
        var ballot = data.ballot;
        var polling_location = data.polling_location;
        var tallies = ballot.map(function (election) {
          return election.cards.map(function (contest) {
            return contest.poll.map(function (option) {
              return false;
            });
          });
        });
        var bvData = {
          address: address || null,
          heading: heading || null,
          ballot: ballot || null,
          polling_location: polling_location || null,
          tallies: tallies || null,
          write_id: bvWriteId || null,
          read_id: bvReadId || null
        };
        ballots.child(bvWriteId).set(bvData, function (error) {
          if (error) {
            return res.status(400).send({ error: 'could not create user' });
          } else {
            return res.json(bvData);
          }
        });
      }
    }
  });

router.route('/write/:bv_id')
  .get(function (req, res) {
    var bvId = req.params.bv_id;
    var ballots = bvRef.child('ballots');
    ballots.child(bvId)
      .once('value')
      .then(function (snap) {
        if (snap.exists()) {
          var ballotData = snap.val();
          delete ballotData.address;
          return res.json(ballotData);
        } else {
          return res.status(400).send({ error: 'ballot does not exist' });
        }
      }).catch(function (error) {
        return res.status(400).send({ error: error.message });
      });
  })
  .put(function (req, res) {
    var bvId = req.params.bv_id;
    var tallies = req.body.tallies;
    var ballots = bvRef.child('ballots');
    ballots.child(bvId).update({
      tallies: tallies
    }, function (error) {
      if (!error) {
        return res.json({ success: 'user updated' });
      } else {
        console.log(error);
        return res.status(400).send({ error: error.message });
      }
    });
  });

router.route('/read/:bv_id')
  .get(function (req, res) {
    var bvId = req.params.bv_id;
    var ballots = bvRef.child('ballots');
    ballots.orderByChild('read_id').equalTo(bvId)
      .once('value').then(function (snap) {
        if (snap.exists()) {
          var ballotData = snap.val();
          ballotData = ballotData[Object.keys(ballotData)[0]];
          delete ballotData.address;
          delete ballotData.write_id;
          return res.json(ballotData);
        } else {
          return res.status(400).send({ error: 'ballot does not exist' });
        }
      }).catch(function (error) {
        return res.status(400).send({ error: error.message });
      });
  });

router.route('/content/candidate')
  .get(function (req, res) {
    var query = req.query.query;

    getCandidateData(query)
      .then(function(data) {
        // console.log(data);
        return res.json({ data: data });
      })
      .catch(function(error) {
        return res.status(400).send({ error: error.message });
      });
  });

router.route('/content/referendum')
  .get(function (req, res) {

    var query = req.query.query;
    var filtered_data = data.filter(function (obj) {
      // console.log(obj.keywords, query)
      return obj.keywords.indexOf(query) > -1;
    });

    return res.json({ data: filtered_data });
  });

module.exports = router;

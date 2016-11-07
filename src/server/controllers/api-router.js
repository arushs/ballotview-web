"use strict";

const express = require('express');
const Promise = require('bluebird');
const router = express.Router();
const request = require('request');
const shortid = require('shortid');
const _ = require('lodash');
const Fuse = require('fuse.js');

const db = require('./firebase');
const parseGoogleCivic = require('./googlecivic');
const parseBallotpediaCandidate = require('./ballotpedia')
const losAngelesCounty = require('./losAngelesCounty');
const stateLetters = require('./stateAbbrevs');
const levelName = require('./levelChanges');

var bvRef = db.ref('ballotview');
var laRef = db.ref('la_county');
// var candidatRef = db.ref('candidates');
var ballotpediaRef = db.ref('ballotpedia');
var ballotpediaMeasuresRef = db.ref('ballotpedia_measures');

const googleKey = 'AIzaSyChX3BTs57b15Q-rTx2nxwhazzJ4jpi2xQ';
const ballotpedia_url = "http://api.ballotpedia.org/v1/api.php?Key=1a9895801d0409ace45990a746d5d94b&DataSet=People";
const ballotpedia_measures_url = "http://api.ballotpedia.org/v1/api.php?Key=1a9895801d0409ace45990a746d5d94b&DataSet=BallotMeasures&ElectionDate=2016-11-08";

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

/*function getIndividualCandidateData(value, j, level, address) {
  console.log(address + "   al ;skdj ");
  function parseCandidateFromBP(name, i, resolve, reject) {
    var nameArray = name.split(" ");
    var firstName = nameArray[0];
    var lastName = nameArray[nameArray.length - 1];
    var seatLevel = levelName[level];
    if(address.length > 2) var stateAbrev = stateLetters[address];
    else var stateAbrev = address;
    var exists = false;
    if(firstName == "Bill" && lastName == "Weld") firstName = "William";
    else if(firstName == "Michael" && lastName == "Pence") firstName = "Mike";
    else if(firstName == "Katie" && lastName == "McGinty") firstName = "Kathleen";
    else if(firstName == "Loretta" && lastName == "Sanchez" && stateAbrev == "CA") seatLevel = "federal";
    else if(firstName == "Kamala" && lastName == "Harris" && stateAbrev == "CA") seatLevel = "federal";
    else if(firstName == "Mike" && lastName == "Doyle" && stateAbrev == "PA") seatLevel = "state";
    if(stateAbrev == "") seatLevel = "federal";
    candidatRef.child(firstName + " " + lastName + " " + seatLevel + " " + stateAbrev)
      .once('value')
      .then(function (snap) {
        if (snap.exists()) {
          console.log("Exists");
          exists = true;
          return resolve(snap.val());
        }  else {
          console.log("Requesting");
          var pedia_api_url = ballotpedia_url + "&FirstName=" + firstName + "&LastName=" + lastName;
          if (seatLevel) pedia_api_url += "&Office.Level=" + seatLevel;
          if (stateAbrev && stateAbrev != "") pedia_api_url = pedia_api_url + "&Office.District.State=" + stateAbrev;
          console.log(pedia_api_url);
          console.log(stateAbrev + " THIS WAS THE STATE");
          request({
            uri: pedia_api_url,
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
              candidatRef.child(firstName + " " + lastName + " " + seatLevel + " " + stateAbrev).set(data);
              return resolve(data);
            }
          });
        }*/


function ballotPediaMeasuresRequest(name, state, locality, summ, resolve) {
  console.log(name, state);

  resolve = resolve || function () {};

  // first check if we can find it in our database
  ballotpediaMeasuresRef.orderByChild('State').equalTo(state).once('value')
    .then(function (snap) {

      if (!snap.exists()) return cacheBallotPediaMeasures();

      // turn it into an array
      var results = _.toArray(snap.val());
      results = results.filter(function (obj) {
        return (obj.Status !== "Not on the ballot");
      });

      var options = {
        shouldSort: true,
        tokenize: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        keys: [ "County" ]
      };
      var fuse = new Fuse(results, options); // "list" is the item array
      results = fuse.search('* ' + locality);

      try {
        options.keys = [ "Name" ];
        options.threshold = 0.1;
        options.tokenize = true;
        fuse = new Fuse(results, options);
        results = fuse.search(name);
      } catch (e) {
        // don't update results
      }

      console.log(results);

      if (typeof summ != 'undefined' && results.length > 3) {
        try {
          console.log(summ);
          options.keys = [ "Name" ];
          options.threshold = 0.3;
          options.tokenize = true;
          fuse = new Fuse(results, options);
          results = fuse.search(summ);
        } catch (e) {
          // don't update results
        }
      }

      // options.keys = [ "PageURL", "Summary", "Name" ];
      // options.threshold = 0.5;
      // options.tokenize = false;
      // fuse = new Fuse(results, options);
      // results = fuse.search(locality);

      var toRet = results[0];

      if (toRet) {
        resolve(toRet)
      } else {
        resolve({ error: "NONE FOUND" });
      }

    }).catch(console.error);

  function cacheBallotPediaMeasures() {
    resolve({error: "NONE FOUND"})
  }
}

function ballotPediaRequest(name, i, level, address, resolve, reject) {

  function parseName(name) {
    var nameArray = name.split(" ");
    var firstName = nameArray[0];
    var lastName = nameArray[nameArray.length - 1];
    if(firstName == "Bill" && lastName == "Weld") firstName = "William";
    else if(firstName == "Michael" && lastName == "Pence") firstName = "Mike";
    else if(firstName == "Katie" && lastName == "McGinty") firstName = "Kathleen";
    return { firstName, lastName };
  }

  var nameObj = parseName(name);
  var fName = nameObj.firstName;
  var lName = nameObj.lastName;
  var seatLevel = levelName[level];

  console.log("LEVEL: "+level, "seatLevel: "+seatLevel+" address: "+address);
  if(address.length > 2) var stateAbrev = stateLetters[address];
  else var stateAbrev = address;

  //Some checks for specific people that have known errors with current system
  if(fName == "Loretta" && lName == "Sanchez" && stateAbrev == "CA") seatLevel = "Federal";
  else if(fName == "Kamala" && lName == "Harris" && stateAbrev == "CA") seatLevel = "Federal";
  else if(fName == "Mike" && lName == "Doyle" && stateAbrev == "PA") seatLevel = "State";
  else if(fName == "John" && lName == "Brown" && stateAbrev == "PA") seatLevel = "Federal";

  //Presidents don't have a state"
  if(stateAbrev == "") seatLevel = "Federal";

  function filterResults(results) {
    if(stateAbrev == "") {
      results = results.filter(function (obj) {
        return (obj.FirstName.toUpperCase().indexOf(fName.toUpperCase()) == 0
        && obj.LastName.toUpperCase().indexOf(lName.toUpperCase()) > -1
        && obj.Offices[0].Level.indexOf(seatLevel) == 0);
      });
    } else{
      results = results.filter(function (obj) {
        return (obj.FirstName.toUpperCase().indexOf(fName.toUpperCase()) == 0
        && obj.LastName.toUpperCase().indexOf(lName.toUpperCase()) > -1
        && obj.Offices[0].Level.indexOf(seatLevel) == 0
        && obj.Offices[0].District.State.indexOf(stateAbrev) == 0);
      });
    }
    return results;
  }

  // first check if we can find it in our database
  ballotpediaRef.orderByChild('FirstName').startAt(fName).endAt(fName).limitToFirst(30).once('value')
    .then(function (snap) {
      // if we couldn't find any results, look for ballotpedia
      if (!snap.exists()) return cacheBallotPedia();

      var vals = snap.val();

      // turn into array
      var results = _.toArray(vals);

      results = filterResults(results);

      // find results?
      if (results.length > 0) {
        // for now!!!
        resolve(results);

      } else {
        // not in our cache. ballotpedia again
        cacheBallotPedia();
      }

      // snap.ref.orderByChild('LastName').endAt(lName).limitToFirst(10).once('value')
      //   .then(function (snap2) {
      //
      //     if (!snap2.exists()) return cacheBallotPedia();
      //
      //
      //   }).catch(reject);

    }).catch(reject);

  // if it doesn't work, then find and cache ballotpedia
  function cacheBallotPedia() {

    var pedia_api_url = ballotpedia_url + "&FirstName=" + fName + "&LastName=" + lName;

    request({
      uri: pedia_api_url,
      method: 'get',
      json: true,
    }, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        return reject(new Error('could not get candidate from Ballotpedia'))
      } else {

        var results = body.Results;

        for (var obj of results) {
          ballotpediaRef.push(obj);
        }

        results = filterResults(results);

        return resolve(results);
      }
    });

  }

}

function getIndividualCandidateData(value, j, level, address) {
  // console.log(address + "----- ADDRESS");

  return new Promise(function (resolve, reject) {
    // If [Hillary Clinton, Tim Kaine]
    if (value.constructor === Array) {
      var toRet = [];
      var done = 0;
      for (var i in value) {
        var name = value[i];
        ballotPediaRequest(name, i, level, address, function (data) {
          done += 1;
          var result = parseBallotpediaCandidate(data);
          result['sortOrder'] = i;
          toRet.push(result);
          if (done >= value.length) {
            if (!_.isEmpty(toRet)) {
              resolve({ sortOrder: j, data: _.sortBy(toRet, ['sortOrder']) });
            } else {
              resolve({});
            }
          }
        }, function (error){
          done += 1;
          console.error(error);
        });
      }
      // Else, value = Kamala Harris
    } else {
      ballotPediaRequest(value, 0, level, address, function (data) {
        resolve({ sortOrder: j, data: parseBallotpediaCandidate(data) });
      }, function (err) {
        resolve({});
      });
    }
  })
}

function getCandidateData(query) {
  return new Promise(function (resolve, reject) {
    var ret = [];
    var promiseFinished = 0;
    for (var i in query.candidate_query) {
      let level = null;
      if (query.level) {
        level = query.level[0];
      }
      getIndividualCandidateData(query.candidate_query[i], i, level, query.address)
        .then(function (data) {
          // console.log(data);
          promiseFinished += 1;
          if (!_.isEmpty(data)) {
            ret.push(data);
          }
          if (promiseFinished === query.candidate_query.length) {
            resolve(_.sortBy(ret, ['sortOrder']).map(function (obj) {
              return obj.data;
            }));
          }
        }).catch(console.error);
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
            console.log("bvData 265:  "+bvData);
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
          // delete ballotData.address;
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
    // console.log(query);
    // console.log("ballotpedia candidate info testing   "+req.query.query[0]); //Line added
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

    var query = req.query.query.split('::')[0];
    var summ = req.query.query.split('::')[1].toLowerCase();
    var state = req.query.state;
    var locality = req.query.locality;

    // preset info
    var filtered_data = [];

    if (state) {
      if (state == 'CA') {
        filtered_data = require('./data').filter(function (obj) {
          // console.log(obj.keywords, query)
          return obj.keywords.indexOf(query) > -1;
        });
      }

      query = query.toUpperCase();

      query = query.replace('STATE MEASURE ', '');
      query = query.replace('COUNTY', '');
      // query = query.replace('MEASURE', '');
      if (query.indexOf(':') > -1) {
        query = query.split(':')[1];
      }
      if (query.indexOf('-') > -1) {
        query = query.split('-')[1];
      }

      return ballotPediaMeasuresRequest(query, state, locality, summ, function (data) {
        if (!('error' in data)) {

          var summary = {
            type: 'referendum_summary',
            Name: data.Name,
            Summary: data.Summary,
            PageURL: data.PageURL
          };
          filtered_data.push(summary);

          if (data.YesVote != "") {
            var yesno = {
              type: 'referendum_yesno',
              YesVote: data.YesVote,
              NoVote: data.NoVote
            }
            filtered_data.push(yesno);
          }

        }
        console.log(filtered_data);
        return res.json({ data: filtered_data });
      });
    } else {
      return res.json({ data: filtered_data });
    }
  });

router.route('/content/grabFromBP')
  .get(function (req, res) {

    var state = req.query.state;

    var pages = 1;
    var currPage = 1;
    var allResults = [];

    grabPage(currPage);

    function grabPage(i) {

      var uri = ballotpedia_measures_url + "&State=" + state + "&Page=" + i;
      console.log(uri);

      request({
        uri: uri,
        method: 'get',
        json: true,
      }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
          return reject(new Error('could not get candidate from Ballotpedia'))
        } else {

          var results = body.Results;

          for (var obj of results) {
            ballotpediaMeasuresRef.push(obj);
          }

          if (i == 1 && parseInt(body.NumResults) > 100) {
            pages = Math.ceil(parseInt(body.NumResults) / 100);
          }

          allResults = allResults.concat(results);

          if (currPage < pages) {
            currPage += 1;
            grabPage(currPage);
          } else {
            res.json(allResults);
          }
        }
      });
    }

  });

module.exports = router;

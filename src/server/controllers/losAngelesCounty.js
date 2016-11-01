const retrieve = require('./retrieveLABallotInfo');
const Promise = require('bluebird');
const _ = require('lodash');

const parties = {
  Democratic: '#0D47A1',
  Republican: '#B71C1C',
  Libertarian: '#F57F17',
  Green: '#558B2F'
};

function BuildCandidateObject(candidates) {
  for (var candidate of candidates) {

  return candidates.map(function (candidate) {

    var subPoll = {};

    subPoll['info'] = candidate.name.split(/, |\//).map(function (name) {
      name = name.split(' for ');
      var infoObj = {
        title: [capitalizeEachWord(name[0])]
      };
      if (1 in name) infoObj['sub'] = ['for ' + name[1]];
      if ('biography' in candidate) {
        if (!('sub' in infoObj)) infoObj['sub'] = [];
        infoObj['sub'].push(candidate.biography);
      }
      return infoObj;
    });

    if ('party' in candidate) {
      subPoll['trail'] = [candidate.party.replace(' Party', '')];

      for (var key in parties) {
        if ('party' in candidate && candidate.party.includes(key)) {
          subPoll['color'] = parties[key];
        }
      }
    }

    return subPoll;

    });
  }
}

function BuildCards(contests) {
  return contests.map(function (contest) {

    if (contest.type == 'candidate') {
      return {
        title: [capitalizeEachWord(contest.office)],
        toc: [capitalizeEachWord(contest.office)],
        subtext: ['Vote for 1'],
        poll: BuildCandidateObject(contest.candidates)
      };
    } else if (contest.type == 'referendum') {
      return {
        title: [contest.office],
        toc: [contest.office],
        subtext: [contest.text, contest.passage_threshold],
        poll: [
          { info: [{ title: [ "Yes" ]}]},
          { info: [{ title: [ "No" ]}]}
        ]
      };
    }
  });
}

function losAngelesCounty(address) {
  return new Promise(function (resolve, reject) {

    var ballot = [];
    var polling_location = {};
    var heading = {};
    var lengthElectoral = 0;

    retrieve.precinct(address).then(function (data) {
      lengthElectoral = data.electoral_district_id.length;
      heading = {
        name: data.name,
        locality: 'Los Angeles',
        date: 'November 8th, 2016',
        mail_only: data.mail_only != 'No'
      };

      for (id of data.electoral_district_id) {
        retrieve.electoral(id)
          .then(function (electoral) {

            ballot.push({
              title: capitalizeEachWord(electoral.type),
              cards: BuildCards(electoral.contests)
            });

            checkDone();
            return null;
          }).catch(reject);
      }

      retrieve.polling_location(data.polling_location_id).then(function (data) {
        polling_location = data;
        checkDone();
        return null;
      }).catch(reject);


      return null;
    }).catch(reject);

    function checkDone() {
      if (ballot.length === lengthElectoral && !_.isEmpty(polling_location)) {
        var data = {
          ballot: ballot,
          polling_location: polling_location,
          heading: heading
        };

        resolve(data);
      }
    }

  });
}

module.exports = losAngelesCounty;

// helper functions

function capitalizeEachWord(str) {
  return str.replace(/\w\S*/g, function(txt) {
  	if(txt == "II" || txt == "III" || txt == "IV" || txt == "VI"){ //These should stay fully capitalized
		return txt;
	}
	else{
		txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		if(txt.length > 2){
			if(txt.substr(0,2) == "Mc"){ //For last names such as McAllister
				txt = txt.substr(0,2) + txt.charAt(2).toUpperCase() + txt.substr(3);
			}
			else if(txt.substr(0,3) == "Mac") { //For last names like MacDonald
				txt = txt.substr(0,3) + txt.charAt(3).toUpperCase() + txt.substr(4);
			}
		}
	}
    return txt;
  });
}

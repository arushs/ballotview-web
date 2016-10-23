const express = require('express');
const router = express.Router();
const request = require('request');

const parties = {
  Democratic: '#0D47A1',
  Republican: '#B71C1C',
  Libertarian: '#F57F17',
  Green: '#558B2F'
};

function capitalizeEachWord(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function BuildReferendumObject(contest)
{
    data = {
      'title': [contest.referendumTitle + ": "],
      'subtext': [contest.referendumText],
      'poll': [
        {'info': [{'title': ['Yes']}]},
        {'info': [{'title': ['No']}]}
      ]
    };

    if ('referendumSubtitle' in contest) {
      data['title'].push(contest.referendumSubtitle);
    } else if ('referendumBrief' in contest) {
      data['title'].push(contest.referendumBrief);
    }
    return data;
}

/// Build Candidate object
function BuildCandidateObject(contest, uniqueCandidates)
{
  store = true;
  data = {
    'title': [contest.office],
    'poll': []
  };

  if ('numberVotingFor' in contest) {
    data['subtext'] = ["Vote for " + contest.numberVotingFor];
  }

  for (var candidate of contest.candidates) {

    var subPoll = {};

    subPoll.info = candidate.name.split(/, |\//).map(function (name) {
      name = name.split(' for ');
      var infoObj = { title: [capitalizeEachWord(name[0])] };
      if (1 in name) infoObj.sub = ['for ' + name[1]];
      return infoObj;
    });

    if (uniqueCandidates.hasOwnProperty(subPoll.info[0].title[0]))
    {
      store = false;
      continue;
    }
    
    if ('party' in candidate) {
      subPoll['trail'] = [candidate.party];

      for (var key in parties) {
        if ('party' in candidate && candidate.party.includes(key)) {
          subPoll['color'] = parties[key];
        }
      }
    }

    uniqueCandidates[subPoll.info[0].title[0]] = '1';
    data['poll'].push(subPoll);
  }

  // if candidate already found in candidates hash
  if (store)
    return data;
  else
    return null;
}

router.get('/', function(req, res) {
	uniqueCandidates = {}
	request({
    uri:'https://www.googleapis.com/civicinfo/v2/voterinfo',
    qs: {
      key: 'AIzaSyChX3BTs57b15Q-rTx2nxwhazzJ4jpi2xQ',
      address: req.query.address || '2365 Scarff Street, Los Angeles 90007'
    },
    method: 'get',
    json: true,
  }, (error, response, body) => {
    var resp = {};

    if (error || response.statusCode !== 200) {
      console.log(error);
    } else {
      resp['ballot'] = [];

      var stateMeasureResp = {};
      stateMeasureResp['title'] = "State Measures";
      stateMeasureResp['cards'] = [];

      var candidateResp = {};
      candidateResp.title = "Candidates";
      candidateResp.cards = [];

      for(var i in response.body.contests){
        var contest = response.body.contests[i];
        if (contest.type == 'Referendum') {
          var data = BuildReferendumObject(contest)
          stateMeasureResp['cards'].push(data);
        }
        else if (contest.type == "General") {
          var data = BuildCandidateObject(contest, uniqueCandidates);
          if (data != null)
            candidateResp['cards'].push(data);
        }
      }

      resp['ballot'].push(candidateResp);
      resp['ballot'].push(stateMeasureResp);
    }

    res.json(resp);
  });
});

module.exports = router;

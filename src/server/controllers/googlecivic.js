const parties = {
  Democratic: '#0D47A1',
  Republican: '#B71C1C',
  Libertarian: '#F57F17',
  Green: '#558B2F'
};

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

module.exports.capitalizeEachWord = capitalizeEachWord;

function BuildReferendumObject(contest)
{
    data = {
      'title': [contest.referendumTitle + ": "],
      'subtext': [contest.referendumText],
      'toc': [contest.referendumTitle],
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
    'toc': [contest.office],
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
      subPoll['trail'] = [candidate.party.replace(' Party', '')];

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

function parseGoogleCivic(data) {

  if (!('contests' in data))
    return { error: 'data from google civic api is invalid.'};

  var resp = {};
  var uniqueCandidates = {}

  resp['ballot'] = [];

  var stateMeasureResp = {};
  stateMeasureResp['title'] = "State Measures";
  stateMeasureResp['cards'] = [];

  var candidateResp = {};
  candidateResp.title = "Candidates";
  candidateResp.cards = [];

  for(var contest of data.contests){
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

  return resp;
}

module.exports = parseGoogleCivic;

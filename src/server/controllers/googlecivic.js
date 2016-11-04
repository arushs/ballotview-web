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
      'type': 'Referendum',
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
    'type': 'Candidate',
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

  // HEADING
  // console.log(data.state);
  resp['heading'] = {
    date: 'November 8th, 2016',
    mail_only: data.mailOnly === true
  };
  if ('local_jurisdiction' in data.state[0]) {
    resp['heading']['locality'] = data.state[0].local_jurisdiction.name;
  }

  // POLLING LOCATION
  if ('pollingLocations' in data) {
    var pollObj = data.pollingLocations[0];
    resp['polling_location'] = {
      address: {
        city: pollObj.address.city || null,
        line1: pollObj.address.line1 || null,
        location_name: pollObj.address.locationName || null,
        state: pollObj.address.state || null,
        zip: pollObj.address.zip || null
      },
      directions: pollObj.notes || null,
      polling_hours: pollObj.pollingHours || null
    };
  }

  // GENERATE BALLOTS
  resp['ballot'] = [];

  var stateMeasureResp = {};
  stateMeasureResp['title'] = "State Measures";
  stateMeasureResp['cards'] = [];

  var candidateResp = {};
  candidateResp.title = "Candidates";
  candidateResp.cards = [];

  for(var contest of data.contests){
    if (contest.type == 'Referendum') {
      var referendum_data = BuildReferendumObject(contest);
      stateMeasureResp['cards'].push(referendum_data);
    }
    else if (contest.type == "General") {
      var candidate_data = BuildCandidateObject(contest, uniqueCandidates);
      if (candidate_data != null)
        candidateResp['cards'].push(candidate_data);
    }
  }

  resp['ballot'].push(candidateResp);
  resp['ballot'].push(stateMeasureResp);

  // RETURN ALL GENERATED
  return resp;
}

module.exports = parseGoogleCivic;

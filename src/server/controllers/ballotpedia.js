
function parseBallotpediaCandidate(data) {
  var ret = {};
  if (data.NumResults == 0) {
    return ret;
  } 

  var candidate = data.Results[0];

  var ret = {
    type: 'candidate',
    num_results: '1',
    Name: candidate.Name,
    Image: candidate.Image,
    PageUrl: candidate.PageUrl,
    Summary: candidate.Summary,
    Party: candidate.PartyAffiliation,
    Websites: {},
    source: "ballotpedia" 
  };

  if ("Office" in candidate.Websites) {
    ret.Websites.Office = candidate.Websites.Office;
  }

  if ("Campaign" in candidate.Websites) {
    ret.Websites.Campaign = candidate.Websites.Campaign;
  }

  if ("Personal" in candidate.Websites) {
    ret.Websites.Personal = candidate.Websites.Personal;
  }

  return ret;
}

module.exports = parseBallotpediaCandidate;

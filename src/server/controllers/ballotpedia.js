
function parseBallotpediaCandidate(data) {
  var ret = {};
  if (data.length === 0) {
    return ret;
  }

  var candidate = data[0];

  var ret = {
    type: 'candidate',
    num_results: '1',
    Name: candidate.Name,
    Image: candidate.Image,
    Summary: candidate.Summary, //candidate.Summary,
    Party: candidate.PartyAffiliation,
    Websites: {},
    source: "ballotpedia"
  };

  if ("PageURL" in candidate) {
    ret.PageURL = candidate.PageURL;
  }

  if ('Websites' in candidate) {

    if ("Office" in candidate.Websites) {
      ret.Websites.Office = candidate.Websites.Office;
    }

    if ("Campaign" in candidate.Websites) {
      ret.Websites.Campaign = candidate.Websites.Campaign;
    }

    if ("Personal" in candidate.Websites) {
      ret.Websites.Personal = candidate.Websites.Personal;
    }

  }

  return ret;
}

module.exports = parseBallotpediaCandidate;


function parseBallotpediaCandidate(data) {
  var ret = {};
  if (data.NumResults == 0) {
    return ret;
  } 

  if(data.Results.length == 7){ // Short term fix for Gary Johnson situation
    var candidate = data.Results[2];
  } else if(data.Results.length == 3){
    var candidate = data.Results[2];
  } else{ // For candidates like Gary Johnson where there exist multiple with the same name
    var candidate = data.Results[0];
  }

  var improvedSummary = "";
  for(var i = 0, len = candidate.Summary.length; i<len; i++){ // Sort out the ugly ballotpedia reference link that comes up as plain text
    if(candidate.Summary[i] == "<"){
      if(!candidate.Summary[i+1]) break;
      if(candidate.Summary[i+1] == "a") break;
    }
    improvedSummary = improvedSummary + candidate.Summary[i];
  }

  var ret = {
    type: 'candidate',
    num_results: '1',
    Name: candidate.Name,
    Image: candidate.Image,
    Summary: improvedSummary, //candidate.Summary,
    Party: candidate.PartyAffiliation,
    Websites: {},
    source: "ballotpedia" 
  };

  if ("PageUrl" in candidate) {
    ret.PageUrl = candidate.PageUrl;
  }

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

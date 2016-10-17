const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res) {
	// var address = {};
	var info = request({
	uri:'https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyChX3BTs57b15Q-rTx2nxwhazzJ4jpi2xQ&address=2365+Scarff+Street%2C+Los+Angeles+90007',
	method: 'get',
	json: true,
   }, (error, response, body) => {
    if (!error && response.statusCode === 200) {

    } else {
      console.log(error);
    }

    var j = "";
    // console.log(response.body.contests);
    var resp = {};

    resp['ballot'] = [];

    var stateMeasureResp = {};
    stateMeasureResp['title'] = "State Measures";
    stateMeasureResp['cards'] = [];

    for(var i in response.body.contests){
        var contest = response.body.contests[i];
        if (contest.type == 'Referendum')
        {
            data = {};
            data['title'] = contest.referendumTitle + ": ";
            if ("referendumSubtitle" in contest)
            {
                data['title'] += contest.referendumSubtitle;
            }
            else
            {
                data['title'] += contest.referendumBrief;
            }
            data['subtext'] = contest.referendumText;
           
            data['poll'] = [];
            var subPoll = {};
            subPoll['info'] = [];
            subPoll['info'].push({"title":"Yes"});
            data['poll'].push(subPoll);

            subPoll = {};
            subPoll['info'] = [];
            subPoll['info'].push({"title":"No"});
            data['poll'].push(subPoll);

            stateMeasureResp['cards'].push(data);
        }
        else if (contest.type == "General")
        {
            console.log(contest);
        }
    }

    resp['ballot'].push(stateMeasureResp);
    res.json(resp);
  });
});

module.exports = router;
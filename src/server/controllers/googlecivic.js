const express = require('express');
const router = express.Router();
const request = require('request');
const google = require('googleapis');






// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

router.get('/', function(req, res) {
	// var address = {};
	console.log("Hello");
	var info = request({
	uri:'https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyChX3BTs57b15Q-rTx2nxwhazzJ4jpi2xQ&address=2365+Scarff+Street%2C+Los+Angeles+90007',
	method: 'get',
	json: true,
   }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
    	// TODO: Add error handling here
    	// console.log(response);

    	console.log(response);
    } else {
      console.log(error);
    }

    var j = "";

    for(var i in response.body.contests){
    	j = j + response.body.contests[i].type + "--"
    	if(response.body.contests[i].type == 'General'){
    		j = j + response.body.contests[i].office + ":  ";
    		for(var k in response.body.contests[i].candidates){
    			j = j + response.body.contests[i].candidates[k].name + ", ";
    		}
    		j = j + "              ";
    	}
    	else if(response.body.contests[i].type == 'Referendum'){
    		j = j + response.body.contests[i].referendumTitle + "             ";
    	}
    }
    res.json(j);
  });
});

module.exports = router;
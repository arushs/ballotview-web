const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

/*********************
*                    *
*      HELPERS       *
*                    *
**********************/

function renderUser(email) {
	var data = {};
	data.email_address = email;
	data.status = 'subscribed';
	return data;
}


/*********************
*                    *
*       ROUTES       *
*                    *
**********************/
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post('/submit', function(req, res) {
	var data = {};
	data.members = [];
	data.members.push(renderUser(req.body.email));
	console.log(data);
	var req = request({
    uri: 'https://us8.api.mailchimp.com/3.0/lists/' + config.mailchimp_list_id,
    method: 'post',
    json: true,
    body: data,
    auth: {
	    user: config.mailchimp_username,
	    pass: config.mailchimp_apikey,
	    'sendImmediately': true
  	}
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
    	// TODO: Add error handling here
    	// console.log(response);
    } else {
      // console.log(error);
    }
  });
  
  res.status(200);
});

module.exports = router;
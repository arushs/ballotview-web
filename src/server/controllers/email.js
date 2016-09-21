var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
// router.get('/', function(req, res) {
//   res.send('Birds home page');
// });
// define the about route
router.get('/submit', function(req, res) {
  res.status(200).json({ error: 'message' });
});

module.exports = router;
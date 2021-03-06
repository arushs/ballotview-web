require('newrelic');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const indexPath = path.join(__dirname, '/../../www/index.html');

const email = require('./controllers/email');
const request = require('request');
const config = require('./config');

const router = require('./controllers/api-router');

// set port
app.set('port', (process.env.PORT || 5000));


const publicPath = express.static(path.join(__dirname, '../public'));
app.use('/public', publicPath);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use('/api/email', email);
app.use('/ballot', router);

app.use('/dist', express.static(path.join(__dirname, '..', '..', 'dist')));

// require("babel-register");
// app.get('/', require('./server-render-index'));
app.get('*', function(req, res) { res.sendFile(indexPath); });

http.listen(app.get('port'), () => {
  console.log('RUNNING.');
});

const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const indexPath = path.join(__dirname, '/../../www/index.html');
const publicPath = express.static(path.join(__dirname, '../public'));

app.use('/public', publicPath);

app.get('/', (_, res) => { res.sendFile(indexPath); });
app.get('/api/email/submit', (req, res) => {
  res.status(200).json({ error: 'message' });
});

// const api = require('./api');

// app.get('/api/email/submit', function (req, res) {
//    console.log('In express api');
//   res.send('Got a POST request');
// });

app.set('port', (process.env.PORT || 5000));

app.use('/dist', express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('*', express.static(path.join(__dirname, '..', 'www')));


http.listen(app.get('port'), () => {
  console.log('RUNNING.');
});

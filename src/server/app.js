const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const indexPath = path.join(__dirname, '/../../www/index.html')
const publicPath = express.static(path.join(__dirname, '../public'))
app.use('/public', publicPath)

app.get('/', function (_, res) { res.sendFile(indexPath) })

// const api = require('./api');

app.set('port', (process.env.PORT || 5000));

app.use('/dist', express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('*', express.static(path.join(__dirname, '..', 'www')));


http.listen(app.get('port'), () => {
  console.log('RUNNING.');
});

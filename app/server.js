'use strict';

const express = require('express');
const config = require('config');

const PORT = config.get('port');

const app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);
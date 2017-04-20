'use strict';

const express = require('express');
const config = require('config');
const cors = require('cors');

const PORT = config.get('port');

const app = express();

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);

console.log('Running on http://localhost:' + PORT);

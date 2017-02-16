'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
//const uriUtil = require('mongodb-uri');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// duplicate??
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.options('api/login', cors());
app.options('api/passcheck', cors());

app.use('/api/devices', require('./api/devices/routes/get_devices'));
// app.use('/api/devices', require('./api/devices/routes/get_device'));
app.use('/api/devices', require('./api/devices/routes/update_device'));
app.use('/api/devices', require('./api/devices/routes/put_device'));
app.use('/api/users', require('./api/users/routes/get_users'));
app.use('/api/users', require('./api/users/routes/put_user'));
app.use('/api/update-user', require('./api/users/routes/update_user'));
app.use('/api/login', cors(), require('./api/login/routes/login'));
app.use('/api/passcheck', cors(), require('./api/login/routes/passcheck'));
app.use('/api/log', require('./api/log/routes/get_log'));

const hostname = 'localhost'; // this might not be needed
const port = 3001;
const server = app.listen(port, () => {

  console.log(`Server running at http://${hostname}:${port}/`);
  
});

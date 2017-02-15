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

// const mongodbUri = 'mongodb://cienki:secret@ds031925.mlab.com:31925/contacts-test';
// const mongooseUri = uriUtil.formatMongoose(mongodbUri);
// const dbOptions = {};

app.use('/api/devices', require('./api/devices/routes/get_devices'));
// app.use('/api/devices', require('./api/devices/routes/get_device'));
app.use('/api/devices', require('./api/devices/routes/update_device'));
app.use('/api/devices', require('./api/devices/routes/put_device'));
app.use('/api/users', require('./api/users/routes/get_users'));
app.use('/api/users', require('./api/users/routes/put_user'));
app.use('/api/update-user', require('./api/users/routes/update_user'));
app.use('/api/login', require('./api/login/routes/login'));
// app.use('/api/contacts', require('./api/contacts/routes/get_contacts'));
// app.use('/api/contacts', require('./api/contacts/routes/get_contact'));
// app.use('/api/contacts', require('./api/contacts/routes/put_contact'));
// app.use('/api/contacts', require('./api/contacts/routes/delete_contact'));
app.use('/api/log', require('./api/log/routes/get_log'));

const hostname = 'localhost'; // this might not be needed
const port = 3001;
const server = app.listen(port, () => {

  // mongoose.connect(mongooseUri, dbOptions, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(`Server running at http://${hostname}:${port}/`);
  // });

  console.log(`Server running at http://${hostname}:${port}/`);
  
});

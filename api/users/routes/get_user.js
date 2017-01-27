// THIS IS NOT WORKKING, SHOULD BE REPLACED WITH THE QUERY EXAMPLE FROM:
// http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.04.html
// disabled in server.js

const express = require('express');
const router = express.Router();
const config = require('../../config');
const log = require('../../../log/logger');
var AWS = require("aws-sdk");

AWS.config.update({
    region: config.region,
    endpoint: config.endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: config.usersTableName,
    Key: {
        "Name": ""
    }
};

router.route('/:id')
  .get((req, res) => {
      params.Name = req.params.id;
      console.log("params.Name: " + params.Name);
      console.log("req.params.id: " + req.params.id);

    docClient.get(params, function(err, data) {
        if (err) {
            log.error(req.connection.remoteAddress + " Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(400).json(err);
        } else {
            log.info(req.connection.remoteAddress + " GetItem succeeded:", JSON.stringify(data, null, 2));
            res.json(data);
        }
    });
    
  });

module.exports = router;
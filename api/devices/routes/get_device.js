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
    TableName: config.devicesTableName,
    IndexName: "CurrentLocation-index",
    KeyConditionExpression: "#loc = :loc",
    ExpressionAttributeNames:{
        "#loc": "CurrentLocation-index"
    },
    ExpressionAttributeValues: {
        ":loc": ""
    }
};

router.route('/:id')
  .get((req, res) => {

      params.ExpressionAttributeValues[":loc"] = req.params.id;

      docClient.query(params, function(err, data) {
        if (err) {
            log.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            res.status(400).json(err);
        } else {
            var retData = [];  
            log.info("Device query succeeded.");
            data.Items.forEach(function(device) {
                retData = retData.concat(device);
            });

            res.json(retData);
        }
    });

  });

module.exports = router;
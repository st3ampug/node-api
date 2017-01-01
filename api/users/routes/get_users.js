// const express = require('express');
// const mongoose = require('mongoose');
// const Contact = require('../model/Contact');
// const router = express.Router();

const express = require('express');
const router = express.Router();
const config = require('../../config');
var AWS = require("aws-sdk");

AWS.config.update({
    region: config.region,
    endpoint: config.endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: config.usersTableName
};

router.route('/')
  .get((req, res) => {

    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            res.status(400).json(err);
        } else {
            var retData = [];       
            // print all the entries
            console.log("Users scan succeeded.");
            data.Items.forEach(function(user) {
                retData = retData.concat(user);
            });

            // continue scanning if we have more devices, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }

            res.json(retData);
        }
    }
    
  });

module.exports = router;
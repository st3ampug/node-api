const express = require('express');
const router = express.Router();
const config = require('../../config');
const log = require('../../../log/logger');
var getIP = require('ipware')().get_ip;
var AWS = require("aws-sdk");

AWS.config.update({
    region: config.region,
    endpoint: config.endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: config.devicesTableName
};

router.route('/')
  .get((req, res) => {
      var ipinfo = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //const _serial = req.params.serial;

    docClient.scan(params, onScan);
    function onScan(err, data) {
        
        if (err) {
            //console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            log.error(ipinfo + " Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            res.status(400).json(err);
        } else {
            var retData = [];       
            // print all the entries
            //console.log("Devices scan succeeded.");
            data.Items.forEach(function(device) {
                retData = retData.concat(device);
            });

            // continue scanning if we have more devices, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
            
            log.info(ipinfo + " Devices scan succeeded.");
            res.status(200).json(retData);
        }
    }
  });

module.exports = router;
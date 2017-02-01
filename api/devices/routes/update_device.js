const express = require('express');
const router = express.Router();
const log = require('../../../log/logger');
const config = require('../../config');

var AWS = require("aws-sdk");

AWS.config.update({
    region: config.region,
    endpoint: config.endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient();

router.route('/')
    .post((req, res) => {

        var ipinfo = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var params = {
            TableName: config.devicesTableName,
            Key: {
                "Serial": req.body.Serial,
                "DeviceName": req.body.DeviceName
            },
            UpdateExpression: "set CurrentLocation = :cl",
            ExpressionAttributeValues: {
                ":cl": req.body.CurrentLocation
            },
            ReturnValues: "UPDATED_NEW"
        };
        console.log(params);

        console.log("Updating the device...");
        docClient.update(params, function(err, data) {
            if (err) {
                //console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                log.error(ipinfo + " Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                res.status(400).json(err);
            } else {
                //log.info("Update succeeded:", JSON.stringify(data, null, 2));
                log.info(ipinfo + " Update succeeded: Device: " + params.Key.Serial + " (" + params.Key.DeviceName + ") >> " + req.body.CurrentLocation);
                res.status(200).json(data);
            }
        });
    });

module.exports = router;
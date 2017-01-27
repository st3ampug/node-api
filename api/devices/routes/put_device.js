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
    Item: {}
};

router.route('/')
    .put((req, res) => {
        params.Item = req.body;
        var ipinfo = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log("Adding a new item...");
        docClient.put(params, function(err, data) {
            if (err) {
                log.error(ipinfo + " Unable to add device. Error JSON:", JSON.stringify(err, null, 2));
                res.status(400).json(err);
            } else {
                //log.info(req.connection.remoteAddress + " Added device:", JSON.stringify(data, null, 2));
                log.info(ipinfo + " Added device: ", params.Item.DeviceName);
                res.status(200).json(data);
            }
        });
    });

module.exports = router;
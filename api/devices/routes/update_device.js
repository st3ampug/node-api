const express = require('express');
const router = express.Router();
const config = require('../../config');

var AWS = require("aws-sdk");

AWS.config.update({
    region: config.region,
    endpoint: config.endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient();

router.route('/')
    .post((req, res) => {
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
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                res.status(400).json(err);
            } else {
                console.log("Update succeeded:", JSON.stringify(data, null, 2));
                res.status(200).json(data);
            }
        });
    });

module.exports = router;
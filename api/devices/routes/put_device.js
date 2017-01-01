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
    TableName: config.devicesTableName,
    Item: {}
};

router.route('/')
    .put((req, res) => {
        params.Item = req.body;

        console.log("Adding a new item...");
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                res.status(400).json(err);
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                res.status(200).json(data);
            }
        });
    });

module.exports = router;
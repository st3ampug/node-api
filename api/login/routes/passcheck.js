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
    TableName: config.usersTableName
};

router.route('/')
  .post((req, res) => {
    var ipinfo = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var sentemail = req.body.Email;

    console.log("sent email: " + req.body.Email);
    console.log("req.body: " + JSON.stringify(req.body));

    if( typeof(req.body.Email) !== 'undefined' ){
            docClient.scan(params, onScan);
            function onScan(err, data) {
                if (err) {
                    log.error(ipinfo + " Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                    res.status(400).json(err);
                } else {
                    var retData = [];       
                    // print all the entries
                    //console.log("Users scan succeeded.");
                    
                    // update gives back everything from the table, and it would include sensitive info
                    // this is why the retData is restricted to contain only necessary info
                    data.Items.forEach(function(user) {
                        if(user.Email === sentemail) {
                            var tmp = {
                                Email: user.Email,
                                LoggedIn: user.LoggedIn
                            };
                            retData = tmp;
                            // obviously if multiple users are returned the last one will be shown only!
                        }
                    });

                    // continue scanning if we have more devices, because
                    // scan can retrieve a maximum of 1MB of data
                    if (typeof data.LastEvaluatedKey != "undefined") {
                        console.log("Scanning for more...");
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        docClient.scan(params, onScan);
                    }

                    log.info(ipinfo + " Users scan for login pass succeeded.");
                    res.status(200).json(retData);
                }
            }
    } else {
        log.error(ipinfo + " Unable to scan the table.");
        res.status(400).json({msg: "Unable to scan the table."});
    }
  });

module.exports = router;
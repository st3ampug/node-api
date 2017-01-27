const lblReader = require('line-by-line')
const express = require('express');
const router = express.Router();
const config = require('../../config');
const log = require('../../../log/logger');
const filename = "./api-";


router.route('/:date')
    .get((req, res) => {
        var file = filename + req.params.date + ".log";
        var lr = new lblReader(file);
        var retData = [];

        lr.on('error', function (err) {
            log.error(req.connection.remoteAddress + " Unable to query. Error:", JSON.stringify(err, null, 2));
            res.status(400).json(err);
        });

        lr.on('line', function (line) {
            retData = retData.concat(line);
        });

        lr.on('end', function () {
            log.info(req.connection.remoteAddress + " Log query succeeded.");
            res.status(200).json(retData);
        });
    });

module.exports = router;
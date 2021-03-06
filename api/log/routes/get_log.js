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

        var ipinfo = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        log.info("Logging ip info: " + ipinfo);

        lr.on('error', function (err) {
            log.error(ipinfo + " Unable to query. Error:", JSON.stringify(err, null, 2));
            res.status(400).json(err);
        });

        lr.on('line', function (line) {
            retData = retData.concat(line);
        });

        lr.on('end', function () {
            log.info(ipinfo + " Log query succeeded.");
            res.status(200).json(retData);
        });
    });

module.exports = router;
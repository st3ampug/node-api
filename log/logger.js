function currentDate() {
    var dateFormat = require('dateformat');
    var now = new Date();
    //dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    return dateFormat(now, "yyyy-mm-dd");
}

var fs = require('fs')
  , Log = require('log')
  , log = new Log('info', fs.createWriteStream('api-' + currentDate() + '.log'));

module.exports = log;
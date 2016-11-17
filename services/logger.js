'use strict';

var sheetService = require('../services/spreadsheets.js');

function logBalanceRequest(scoutId, scoutName, emailSubmitted, balanceOnFile, msgSentTo, next) {
    sheetService.getSpreadsheet('balance_log', 'scout_apps', function(sheet) {
        var balanceLog = new sheetService.BalanceLog(
            scoutId, 
            scoutName,
            emailSubmitted,
            balanceOnFile,
            msgSentTo
        );
        sheetService.writeGenericRows(sheet, balanceLog, next);
    });
}

module.exports  = {
    logBalanceRequest: logBalanceRequest
};
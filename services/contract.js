'use strict';

let sheetService = require('../services/spreadsheets.js');
let docName = 'scout_apps';
let viewName = 'tech_contract';
let mailer = require('../services/mailer');

function logContractSubmission (contract, next) {
    sheetService.getSpreadsheet(viewName, docName, function (sheet) {
        sheetService.writeGenericRows(sheet, contract, function(){
            mailer.sendSystemEmail(
                'New Tech Contract Submitted',
                'Scout: ' + contract.scoutname + '<br>' +
                'Parent: ' + contract.parentname

            );
            sendTechChipCardLink(contract, next);
        });
    });
    
}

function sendTechChipCardLink(contract, next) {
    console.log('emailing contract stuff');
    next();
}

module.exports = {
    logContractSubmission: logContractSubmission
}
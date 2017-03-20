'use strict';

var sheetService = require('../services/spreadsheets.js');

function logContractSubmission (contract, next) {
    //log the contract in spreadsheet
    console.log('contract will be logged by this function');
    sendTechChipCardLink(contract, next);
}

function sendTechChipCardLink(contract, next) {
    console.log('emailing contract stuff');
    next();
}

module.exports = {
    logContractSubmission = logContractSubmission
}
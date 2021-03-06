'use strict';

let sheetService = require('../services/spreadsheets.js');
let docName = 'scout_apps';
let viewName = 'tech_contract';
let mailer = require('../services/mailer');
const StringUtils = require('../helpers/StringUtils.js');
let utils = require('../utils/common');

function logContractSubmission(req, contract, next) {
    sheetService.getSpreadsheet(viewName, docName, function (sheet) {
        sheetService.writeGenericRows(sheet, contract, function () {
            mailer.sendSystemEmail(
                'New Tech Contract Submitted',
                'Scout: ' + contract.scoutname + '<br>' +
                'Parent: ' + contract.parentname

            );
            sendTechChipCardLink(req, contract, next);
        });
    });
}

function getContractById(contractId, next) {
    sheetService.getSpreadsheet(viewName, docName, function (sheet) {
        sheet.getRows({
            offset: 1
        },
            function (err, rows) {
                console.log('Read ' + rows.length + ' contracts.');
                let matchedContract = null;
                for (let i = 0; i < rows.length; i++) {
                    let contract = rows[i];
                    matchedContract = (contract.contractid === contractId) ? contract : null;
                    if (matchedContract) {
                        break;
                    }
                }
                next(matchedContract);
            });
    });
}

function sendTechChipCardLink(req, contract, next) {
    let chipCardUrl = req.protocol + '://' + req.get('host') + '/policy/tech-card/' + contract.contractid;
    let messageLines = [
        'The Troop 212 Technology Chip Contract for ' + contract.scoutname + ' has been received.',
        'Once you have completed all of the requirements for the Troop 212 Technolgy Chip, follow the link below, print the Technolgy Chip Honor Card and bring it to the next Troop meeting.',
        'If you have met all the necessary requirements, your Chip Card will be activated.',
        '<a href="' + chipCardUrl + '">' + chipCardUrl + '</a>',
        'This is an automated message. Please do not reply.',
    ];
    utils.buildHtmlBlockFromStringArray(messageLines, function (message) {
        let recipients = [contract.scoutemail, contract.parentemail];
        let su = new StringUtils();
        su.createCommaDelimitedStringFromArray(recipients, function (toEmailAddressStrings) {
            let subject = 'Tech Contract Submission Confirmation: ' + contract.scoutname;
            mailer.sendEmailToRecipients(toEmailAddressStrings, subject, message, false);
        });
    });
    next();
}

function updateContract(contract, next) {
    getContractById(contract.contractid, function (contractRow) {

        //TOFIX: need to evaluate these spreadsheet bools b/c this is broken as written
        utils.evalSpreadsheetBool(contractRow.activated, function (contractRowActivated) {
            console.log('formActivated: ' + contract.activated);
            console.log('rowActivated: ' + contractRowActivated);
            contractRow.dateactivated = (contract.activated && !contractRowActivated)
                ? Date.now() : contractRow.dateactivated;
            contractRow.activated = contract.activated;
            contractRow.corners = contract.corners;
            contractRow.save(function () {
                console.log("Contract for " + contractRow.scoutname + " updated.");
                next(contractRow);
            });
        });

    });
}

module.exports = {
    logContractSubmission: logContractSubmission,
    getContractById: getContractById,
    updateContract: updateContract
}
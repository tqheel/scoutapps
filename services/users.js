'use strict';
var sheetService = require('../services/spreadsheets.js');
var utils = require('../utils/common.js');
var fs = require('fs');

let adminJson = 'secrets/admins.json';

function lookupEmailAddress(email, next) {
    email = email.toLowerCase();
    sheetService.getSpreadsheet('user_data', 'scout_apps', function (sheet) {
        getUserData(sheet, email, function (users) {
            var matchedUsers = [];
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                if (email === user.scoutemail.toLowerCase() ||
                    email === user.parentemail1.toLowerCase() ||
                    email === user.parentemail2.toLowerCase()) {
                    matchedUsers.push(user);
                }
            }
            for (let i = 0; i < matchedUsers.length; i++) {
                let user = matchedUsers[i];
                user.emailAddresses = [];
                if (!utils.isEmptyOrWhitespace(matchedUsers[i].scoutemail)) {
                    user.emailAddresses.push(user.scoutemail);
                }
                if (!utils.isEmptyOrWhitespace(user.parentemail1)) {
                    user.emailAddresses.push(user.parentemail1);
                }
                if (!utils.isEmptyOrWhitespace(user.parentemail2)) {
                    user.emailAddresses.push(user.parentemail2);
                }
                //now we need to de-duplicate
                console.log(user.emailAddresses);
                user.emailAddresses = utils.deDuplicateArray(user.emailAddresses);
                console.log(user.emailAddresses);
            }
            for (let i = 0; i < matchedUsers.length; i++) {
                let user = matchedUsers[i];
                console.log('The emails for ' + user.firstname + ' ' + user.lastname + ' are:');
                for (let j = 0; j < user.emailAddresses.length; j++) {
                    let address = user.emailAddresses[j];
                    console.log(address);
                }
            }
            next(matchedUsers);
        });
    });
}

function getUserData(sheet, email, next) {
    sheet.getRows({
        offset: 1
    },
        function (err, rows) {
            console.log('Read ' + rows.length + ' rows');
            next(rows);
        });
}

function readAdminJson() {
    fs.readFile(adminJson, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        return JSON.parse(data);
    });
}

function isUserValidAdmin(userId, password) {
    //TODO: make this work with a spreadsheet instead of json file
    readAdminJson(function (admins) {
        let admin = admins.filter(function (item) {
            return item.adminUserId === userId;
        });
        //TOFIX: async problem here and password validation is crashing app
        if (admin) {
            return admin.adminPassword === password;
        }
        return false;
    });

}

function isUserAuthorizedAsAdmin(userId, password, next) {
    next(isUserValidAdmin(userId, password));
}

module.exports = {
    lookupEmailAddress: lookupEmailAddress,
    isUserAuthorizedAsAdmin: isUserAuthorizedAsAdmin
}
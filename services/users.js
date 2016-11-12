'use strict';
var sheetService = require('../services/spreadsheets.js');
var utils = require('../utils/common.js');

function lookupEmailAddress(email, next) {
    sheetService.getSpreadsheet('userData', 'scout_apps', function(sheet) {
        getUserData(sheet, email, function(users){
            var matchedUsers = [];
            for(let i = 0; i < users.length; i++) {
                let user = users[i];
                if (email === user.scoutemail || email === user.parentemail1 || email === user.parentemail2) {
                    matchedUsers.push(user);
                }
            }
            matchedUsers.forEach(function(user) {
                user.emailAddresses = [];
                if (!utils.isEmptyOrWhitespace(user.scoutemail)) {
                    user.emailAddresses.push(user.scoutemail);
                }
                if (!utils.isEmptyOrWhitespace(user.parentemail1)) {
                    user.emailAddresses.push(user.parentemail1);
                }
                if (!utils.isEmptyOrWhitespace(user.parentemail2)) {
                    user.emailAddresses.push(user.parentemail2);
                }
                //now we need to de-dupe
                user.emailAddresses = function () {
                    return Array.from(new Set(user.emailAddresses));
                };
            });
            
            
            // var matchedUsers = users.filter(function(user){
            //     return email === user.scoutemail || email === user.parentemail1 || email === user.parentemail2
            // });

            next(matchedUsers);
        });
    });
}

function getUserData(sheet, email, next) {
    sheet.getRows({
        offset: 1
    },
    function( err, rows ){    	
		console.log('Read '+rows.length+' rows');
		next(rows);	
    });
}

module.exports = {
    lookupEmailAddress: lookupEmailAddress
}
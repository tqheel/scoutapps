'use strict';
var sheetService = require('../services/spreadsheets.js');

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
'use strict';
var sheetService = require('../services/spreadsheets.js');

function getAccountById (scoutId, next) {
	var sheetName = '2016-17';
	var docName = 'accounts';
	sheetService.getSpreadsheet(sheetName, docName, function(sheet){
		getScoutAccounts(sheet, scoutId, function(accounts) {
			var matchedAccount = null;
			var message = '';
			for(let i = 0; i < accounts.length; i++){
				let account = accounts[i];
				matchedAccount = (account.scoutid === scoutId)? account : null;
				if (matchedAccount) {
					console.log('=============');
					message = matchedAccount.scoutname+"'s balance is "+ matchedAccount.balance +'.';
					console.log(message);
					//mailService.sendEmail(email, message);
					//next(message);
					break;
				}

			}
			next(matchedAccount);
		});		
	});	
}

function getScoutAccounts(sheet, scoutId, next) {
	sheet.getRows({
      offset: 2
    }, 
	function( err, rows ){    	
		console.log('Read '+rows.length+' rows');
		next(rows);	
    });
}

module.exports = {
	getAccountById: getAccountById
};
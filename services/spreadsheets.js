var fs = require('fs');
var secretFile = '../secrets/spreadsheets.json';
var Spreadsheet = require ('google-spreadsheet');
var mailService = require('../services/mailer.js');
var spreadsheets;

fs.readFile(secretFile, 'utf8', function(err, data) {
		if(err){
			throw err;
		}
		spreadsheets = JSON.parse(data);
});

function getSpreadsheetInfo(spreadsheetName){
	var sheetInfo = spreadsheets.filter(function(item){
			return item.name == spreadsheetName;
	});
	return sheetInfo;
}

function writeSignUp(sheet, next){
	console.log('it worked!');
	next();
}

function processBalanceRequest(email, sheet, next){
	//var sheet = new Spreadsheet('1L_5YVL2PxqXlULW1AwKK8pbw2RR7f9NKsVvF-ZoogCQ');

	sheet.getRows(1, function(err, rowData){
		if(err){
			console.log(err);
		}
		else{
			var matchedRow = null;
			console.log('Got: ' + rowData.length + ' rows.' );
			var message = '';
			for(var i=0;i<rowData.length;i++){
				var row = rowData[i];
				//console.log(row.name);
				//console.log('Name: ' + row.email + ', Balance: ' + row.balance);
				matchedRow = (row.email==email)? row : null;
				if(matchedRow){
					console.log('=============');
					message = matchedRow.name+"'s balance is $"+matchedRow.balance+'.';
					console.log(message);
					mailService.sendEmail(email, message);
					next(message);
					break;
				}

			}
			if(!matchedRow){
				message = 'Email address not found.';
				console.log(message);
				next(message);
			}

		}
	});
}

function getSpreadsheet(spreadsheetName, next){
	var sheetInfo = getSpreadsheetInfo(spreadsheetName);
	var sheet = new Spreadsheet(sheetInfo[0].key);

	next(sheet);
}

module.exports = {
		getSpreadsheet: getSpreadsheet,
		writeSignUp: writeSignUp,
		processBalanceRequest: processBalanceRequest
};

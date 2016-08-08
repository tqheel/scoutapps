var fs = require('fs');
var secretFile = 'secrets/spreadsheets.json';
var authFile = 'secrets/scout_balance-48af87a012b6.json'
var Spreadsheet = require ('google-spreadsheet');
var mailService = require('../services/mailer.js');
var spreadsheets;
var auth;

fs.readFile(secretFile, 'utf8', function(err, data) {
		if(err){
			throw err;
		}
		spreadsheets = JSON.parse(data);
});

fs.readFile(authFile, 'utf8', function(err, data) {
		if(err){
			throw err;
		}
		auth = JSON.parse(data);
});

function getSpreadsheetInfo(docName){
	var sheetInfo = spreadsheets.filter(function(item){
			return item.name == docName;
	});
	return sheetInfo;
}

function writeSignUp(sheet, signupData, next){
	var signUp = new SignUp(signupData.scoutName, signupData.registeredEmail, signupData.additionalEmails);
	console.log('Writing spreadsheet data for ' + signUp.scoutnames);
	sheet.getRows(1, function(err, rowData){
	if(err){
		console.log(err);
	}
	else{
		console.log('Got: ' + rowData.length + ' rows.' );
		// for(var i=0;i<rowData.length;i++){
		// 	var row = rowData[i];
		// 	//console.log(row.name);
		// 	//console.log('Name: ' + row.email + ', Balance: ' + row.balance);
		// 	var matchedRow = (row.email=='sam@sam.com')? row : null;
		// 	if(matchedRow){
		// 		console.log('=============');
		// 		console.log(matchedRow.name+"'s balance is $"+matchedRow.balance+'.');
		// 	}
		// }



		}
	});
	sheet.addRow(
		1,
		signUp,
		function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log('Write to spreadsheet complete!');
			}

		}
	);
	next();
}

function processBalanceRequest(email, sheet, next){

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

function getSpreadsheet(sheetName, docName, next){
	var spreadsheetObject = getSpreadsheetInfo(docName);

	var sheetNum;

	switch(sheetName){
		case 'signup': 
			sheetNum = 0;
			break;
		case 'tech_survey':
			sheetNum = 1;
			break;
	}

	var spreadsheetDoc = new Spreadsheet(spreadsheetObject[0].key);

	if(spreadsheetObject.accessMode!=='public'){
		spreadsheetDoc.useServiceAccountAuth(auth, function(){
			console.log('Successfully authenticated to target spreadsheet doc.');
			getTargetSheet(spreadsheetDoc, sheetNum, next);
		});
	}
	else{
		//does not need to be authenticated, so just run the callback
		getTargetSheet(spreadsheetDoc, sheetNum, next);	
	}  
	
}

function getTargetSheet(spreadsheetDoc, sheetNum, next){
	var sheet;
	console.log(spreadsheetDoc);
	spreadsheetDoc.getInfo(function(err, info){
		if(err){
			console.log(err);
		}
		else{
			console.log('Loaded doc ' + info.title + ', by ' + info.author.email);
			sheet = info.worksheets[sheetNum];
			console.log('Got sheet "' + sheet.title + '".');
			next(sheet);
		}		
	});

}

function writeSurvey(sheet, surveyData, next){
	console.log('Pretend data was written to spreadsheet...');
	next();
}

function SignUp (scoutName, registeredEmail, additionalEmails) {
	this.scoutname = scoutName;
	this.registeredemail = registeredEmail;
	this.additionalemails = additionalEmails;
	this.submittime = Date.now();
	this.isLinked = false;
	this.confsent = false;
}

module.exports = {
		getSpreadsheet: getSpreadsheet,
		writeSignUp: writeSignUp,
		processBalanceRequest: processBalanceRequest,
		writeSurvey: writeSurvey
};

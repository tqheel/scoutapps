'use strict';

var fs = require('fs');
var secretFile = 'secrets/spreadsheets.json';
var authFile = 'secrets/scout_balance-48af87a012b6.json'
var Spreadsheet = require ('google-spreadsheet');
var mailService = require('../services/mailer.js');
var getUniqueId = require('uid');
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
	console.log('Writing spreadsheet data for ' + signUp.scoutname);
	writeGenericRows(sheet, signUp, next);	
}

function writeGenericRows(sheet, data, next) {
    sheet.addRow(
    	data, function(){
    	next();
    });
}

function deleteRow(sheet, id, next) {
	sheet.getRows({
      offset: 1
    }, function( err, rows ){
	  let matchedRows = [];
	  for (let i = 0; i < rows.length; i++) {
		  if (rows[i][0] === id) {
			  matchedRows.push(rows[i]);
		  }
	  }
	  for (let i =0; i < rows.length; i++) {
		  rows[i].del(function() {});
	  }
	  next();
    });
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
		case 'tech_contract':
			sheetNum = 2;
			break;
		case '2016-17':
			sheetNum = 0;
			break;
		case 'sandbox':
			sheetNum = 1;
			break;
		case 'user_data':
			sheetNum = 3;
			break;
		case 'balance_log':
			sheetNum = 5;
			break;
		case 'trips':
			sheetNum = 6;
			break;
	}

	var spreadsheetDoc = new Spreadsheet(spreadsheetObject[0].key);

	if(spreadsheetObject[0].accessMode!=='public'){
		spreadsheetDoc.useServiceAccountAuth(auth, function(){			
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
	spreadsheetDoc.getInfo(function(err, info){
		
		if(err){
			console.log(err);
		}
		else{
			sheet = info.worksheets[sheetNum];

			next(sheet);
		}		
	});

}

function writeSurvey(sheet, surveyData, next){
	var survey = new TechSurvey(surveyData);
	console.log('Survey data is ' + survey.name);
	writeGenericRows(sheet, survey, next);	
}

function TechSurvey (surveyData) {
	this.uid = getUniqueId(10);
	this.name = surveyData.name;
	this.type = surveyData.type;
	this.enhance1 = surveyData.enhance1;
	this.enhance2 = surveyData.enhance2;
	this.enhance3 = surveyData.enhance3;
	this.distract1 = surveyData.distract1;
	this.distract2 = surveyData.distract2;
	this.distract3 = surveyData.distract3;
	this.what_else = surveyData.whatElse;
	this.contact = surveyData.contact;
	this.email = (surveyData.email && surveyData.email != '') 
		? surveyData.email : '';
}

function SignUp (scoutName, registeredEmail, additionalEmails) {
	this.scoutname = scoutName;
	this.registeredemail = registeredEmail;
	this.additionalemails = additionalEmails;
	this.submittime = Date.now();
	this.islinked = false;
	this.confsent = false;
}

function BalanceLog (scoutId, scoutName, emailSubmitted, balanceOnFile, msgSentTo) {
	this.date = new Date();
	this.scoutid = scoutId;
	this.scoutname = scoutName;
	this.emailsubmitted = emailSubmitted;
	this.balanceonfile = balanceOnFile;
	this.msgsentto = msgSentTo
}

module.exports = {
		getSpreadsheet: getSpreadsheet,
		writeSignUp: writeSignUp,
		processBalanceRequest: processBalanceRequest,
		writeSurvey: writeSurvey,
		writeGenericRows: writeGenericRows,
		BalanceLog: BalanceLog,
		deleteRow: deleteRow
};

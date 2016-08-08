var express = require('express');
var router = express.Router();
var https = require('https');
var sheetService = require('../services/spreadsheets.js');
var docName = 'scout_apps';
var viewName = 'tech_survey';

router.get('/', function(req, res) {
	res.render(viewName, {title: 'Opinions on Technology Usage for Troop 212'});
});

router.post('/', function(req, res){
	//todo: issue #4
	sheetService.getSpreadsheet(viewName, docName, function(sheet){
			// req.body.scoutName = 'Sam Smith';
			// req.body.registeredEmail = 'tqualls@gmail.com';
			// req.body.additionalEmails = 'troop212bot@gmail.com';
			sheetService.writeSurvey(sheet, req.body, function(){
				//todo: issue #11
				res.render('signup-success', {result: 'This is the wrong result page, but the survey is working!'});
				console.log('Final callback of writeSurvey function is firing here.');
				console.log('The target sheet is: ' + sheet.title);
				//res.render('Survey data written to spreadsheet.');
			});

	});
});

module.exports = router;

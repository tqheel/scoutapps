var express = require('express');
var router = express.Router();
var https = require('https');
var sheetService = require('../services/spreadsheets.js');
var docName = 'scout_apps';
var viewName = 'survey';

router.get('/', function(req, res) {
	res.render(viewName, {title: 'Opinions on Technology Usage for Troop 212'});
});

router.post('/', function(req, res){
	//todo: issue #4
	sheetService.getSpreadsheet(viewName, docName, function(sheet){
			// req.body.scoutName = 'Sam Smith';
			// req.body.registeredEmail = 'tqualls@gmail.com';
			// req.body.additionalEmails = 'troop212bot@gmail.com';
			sheetService.writeSignUp(sheet, req.body, function(){
				//todo: issue #11
					res.render('signup-success', {result: 'Registration for ' + req.body.scoutName +' has been submitted.'});
			});

	});
});

module.exports = router;

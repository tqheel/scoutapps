var express = require('express');
var router = express.Router();
var https = require('https');
var sheetService = require('../services/spreadsheets.js');
var viewName = 'survey';

router.get('/', function(req, res) {
	res.render(viewName, {title: 'Opinions on Technology Usage for Troop 212'});
});

router.post('/', function(req, res){
	sheetService.getSpreadsheet(viewName, function(sheet){
			// req.body.scoutName = 'Sam Smith';
			// req.body.registeredEmail = 'tqualls@gmail.com';
			// req.body.additionalEmails = 'troop212bot@gmail.com';
			sheetService.writeSignUp(sheet, req.body, function(){
					res.render('signup-success', {result: 'Registration for ' + req.body.scoutName +' has been submitted.'});
			});

	});
});

module.exports = router;

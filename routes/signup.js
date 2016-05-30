var express = require('express');
var router = express.Router();
var https = require('https');
var sheetService = require('../services/spreadsheets.js');


router.get('/', function(req, res) {
	var viewName = 'signup';
	sheetService.getSpreadsheet(viewName, function(sheet){
			req.body.scoutNames = 'Sam Smith, Bill Smith';
			req.body.registeredEmail = 'tqualls@gmail.com';
			req.body.additionalEmails = 'troop212bot@gmail.com';
			sheetService.writeSignUp(sheet, req.body, function(){
					res.render(viewName, {result: 'row written to spreadsheet.'});
			});

	});

});





module.exports = router;

var express = require('express');
var router = express.Router();
var https = require('https');
var sheetService = require('../services/spreadsheets.js');
var docName = 'scout_apps';
var viewName = 'signup';

router.get('/', function(req, res) {
	res.render('unavailable', {title: 'Feature currently unavailable', featureName: 'Scout Balance Registration'});
});

// router.get('/', function(req, res) {
// 	res.render(viewName, {title: 'Register for Scout Account Balance Retrieval Via Email'});
// });

// router.post('/', function(req, res){
// 	sheetService.getSpreadsheet(viewName, docName, function(sheet){
// 			// req.body.scoutName = 'Sam Smith';
// 			// req.body.registeredEmail = 'tqualls@gmail.com';
// 			// req.body.additionalEmails = 'troop212bot@gmail.com';
// 			sheetService.writeSignUp(sheet, req.body, function(){
// 					res.render('signup-success', {result: 'Registration for ' + req.body.scoutName +' has been submitted.'});
// 			});

// 	});
// });

module.exports = router;

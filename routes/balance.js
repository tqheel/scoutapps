var express = require('express');
var router = express.Router();
var https = require('https');
var viewName = 'balance';
var accountService = require('../services/accounts.js');

// router.get('/', function(req, res) {
// 	res.render('unavailable', {title: 'Feature currently unavailable', featureName: 'Scout Account Balance Retrieval'});
// });

router.get('/', function(req,res){
	res.render('balance', { title: 'Request Scout Account Balance Via Registered Email Address' });
});

router.post('/', function(req,res){
	console.log(req.body.email);
	
	// sheetService.getSpreadsheet(sheetName, docName, function(sheet){
	// 	// sheetService.processBalanceRequest(req.body.email, sheet, function(message){
	// 	// //res.send(message+'<p><a href="/">Make Another Request</a>');
	// 	// res.send('<p>The account balance email has been sent.</p><p><a href="/">Make Another Request</a>');

	// 	// });
		
	// });
	accountService.getAccountById(req.body.scoutId, function(account) {
		console.log('Found account balance of ' + account.balance + 
				' for scout ' + account.scoutname + '.');
		res.send('<p>The account balance email has been sent.</p><p><a href="/">Make Another Request</a>');
	
	});
});







module.exports = router;

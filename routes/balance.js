var express = require('express');
var router = express.Router();
var https = require('https');
var viewName = 'balance';
var accountService = require('../services/accounts.js');

function getScoutAccountBalance(res, scoutId) {
	accountService.getAccountById(scoutId, function(account) {
		console.log('Found account balance of ' + account.balance + 
				' for scout ' + account.scoutname + '.');
		res.send('<p>Found account balance of ' + account.balance + 
				' for scout ' + account.scoutname + '.</p><p><a href="/">Make Another Request</a>');	
	});
}

function lookupEmailAddress(req, res) {
	console.log('Here is where we would look for a matching email address...');
	res.send('lookup email address request received for ' + req.email);
	
}

router.get('/', function(req,res){
	res.render('balance', { title: 'Request Scout Account Balance' });
});

router.get('/:scoutId', function (req,res) {
	getScoutAccountBalance(res, req.params.scoutId);
});

router.post('/id', function(req,res){
	getScoutAccountBalance(res, req.body.scoutId);
});

router.post('/email', function(req, res) {
	lookupEmailAddress(req, res);	
}); 

module.exports = router;

var express = require('express');
var router = express.Router();
var viewName = 'balance';
var accountService = require('../services/accounts.js');
var userService = require('../services/users.js');
var mailService = require('../services/mailer.js');

function getScoutAccountBalance(res, scoutId, deliverByEmail, next) {
	accountService.getAccountById(scoutId, function(account) {
		
		// res.send('<p>Found account balance of ' + account.balance + 
		// 		' for scout ' + account.scoutname + '.</p><p><a href="/">Make Another Request</a>');
		if (!deliverByEmail) {
			if (account) {
				console.log('Found account balance of ' + account.balance + 
					' for scout ' + account.scoutname + '.');
				res.render('balance_result', {
					success: true,
					title: 'Scout Account Balance',
					scoutName: account.scoutname,
					starting: account.starting,
					popcorn: account.popcorn,
					popOnline: account.poponline,
					campCard: account.campcard,
					rafting: account.rafting,
					backpacking: account.backpacking,
					fishing: account.fishing,
					climbing: account.climbing,
					balance: account.balance
				});	
			}
			else {
				res.render('balance_result', {
					success: false,
					title: 'Invalid Request Error',
					msg: 'Sorry the Scout ID in your request is not associated with a scout account.'
				});	
			}
		}
		else {

		}
		
	});
}

function lookupEmailAddress(req, res) {
	userService.lookupEmailAddress(req.body.email, function(scouts) {
		var emailFound = (scouts.length > 0);
		if (emailFound) {
			//TODO: getAccountBalance and send below in as callback
		}
		res.render('balance_result_email',{
			emailFound: emailFound,
			success: "The account balance has been sent to the scout's registered email addresses.",
			failure: "Sorry, no scout account was found to be associated with the submitted email address " + req.email +"."
		});
	});

	
	
}

router.get('/', function(req,res){
	res.render(viewName, { title: 'Request Scout Account Balance' });
});

router.get('/:scoutId', function (req,res) {
	getScoutAccountBalance(res, req.params.scoutId);
});

router.post('/id', function(req,res){
	if (req.body.scoutId) {
		getScoutAccountBalance(res, req.body.scoutId);
	}
	else {

	}
});

router.post('/email', function(req, res) {
	lookupEmailAddress(req, res);	
}); 

module.exports = router;

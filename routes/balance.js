var express = require('express');
var router = express.Router();
var viewName = 'balance';
var accountService = require('../services/accounts.js');
var userService = require('../services/users.js');
var mailService = require('../services/mailer.js');
const StringUtils = require('../helpers/StringUtils.js');
var utils = require('../utils/common.js');

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
					manatees: account.manatees,
					shooting: account.shooting,
					wwCenter: account.wwcenter,
					bootcamp: account.bootcamp,
					camporee: account.camporee,
					fortFisher: account.fortfisher,
					aquatics: account.aquatics,
					durant: account.durant,
					knob: account.knob,
					recharter: account.recharter,
					oaFees: account.oafees,
					eagleScoutProjects: account.eagleprojects,
					northernTier: account.northerntier,
					jambo: account.jambo,
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
			next(account);
		}
		
	});
}

//TODO: add callback parameter 'next' and move everything after userService function call to calling 'post" function'
function lookupEmailAddress(req, res) {
	userService.lookupEmailAddress(req.body.email, function(scouts) {
		var emailFound = (scouts.length > 0);
		var atLeastOneAccountFound = false;
		if (emailFound) {			
			for (let i =0; i < scouts.length; i++) {
				getScoutAccountBalance(res, scouts[i].id, true, function (account) {
					if(account) {
						atLeastOneAccountFound = true;
						//create new account property on scout object
						scouts[i].account = account;

						let su = new StringUtils();
						let messageLines = [
							'',
							'',
							'',
							'',
							'',
						];
						utils.buildHtmlBlockFromStringArray(messageLines, function(message) {
							su.createCommaDelimitedStringFromArray(scouts[i].emailAddresses, function(toEmailAddressStrings) {
								let subject = 'Scout Account Balance for ' + scouts[i].firstname + ' ' + scouts[i].lastname;
								mailService.sendEmailToRecipients(toEmailAddressStrings, subject, message);
							});	
						});				
					}
				});

			}
			if (atLeastOneAccountFound) {
				res.render('balance_result_email',{
					emailFound: emailFound,
					accountFound: atLeastOneAccountFound,
					success: "The account balance has been sent to the scout's registered email addresses.",
					failure: "Sorry, no scout account was found to be associated with the submitted email address " + req.email + "."
				});
			}
			
		}
		
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
	console.log('looking up email address from form data...');
	lookupEmailAddress(req, res);	
}); 

module.exports = router;

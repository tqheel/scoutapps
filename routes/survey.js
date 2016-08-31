var express = require('express');
var router = express.Router();
var https = require('https');
var sheetService = require('../services/spreadsheets.js');
var docName = 'scout_apps';
var viewName = 'tech_survey';
var mailer = require('../services/mailer.js');

router.get('/', function(req, res) {
	res.render(viewName, {title: 'Opinions on Technology Usage for Troop 212'});
});

router.post('/', function(req, res){
	sheetService.getSpreadsheet(viewName, docName, function(sheet){
			sheetService.writeSurvey(sheet, req.body, function(){
				res.render('tech-survey-success', {result: 'Your survey submission has been recorded.'});
				mailer.getDefaultSystemEmailInfos(function (emailInfos) {
					mailer.sendSystemEmail(emailInfos, 'New Tech Survey Submitted', 'A new tech survey has been added to the spreadsheet.');
				});
			});
	});
});

module.exports = router;

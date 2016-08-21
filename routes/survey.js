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
			sheetService.writeSurvey(sheet, req.body, function(){
				res.render('tech-survey-success', {result: 'Your survey submission has been recorded.'});
			});

	});
});

module.exports = router;

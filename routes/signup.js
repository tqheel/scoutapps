var express = require('express');
var router = express.Router();
var https = require('https');
var sheetService = require('../services/spreadsheets.js');


router.get('/', function(req, res) {
	var viewName = 'signup';
	sheetService.getSpreadsheet(viewName, function(sheet){
			sheetService.writeSignUp(sheet, function(){
					res.render(viewName, {} );
			});

	});

});





module.exports = router;

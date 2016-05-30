var express = require('express');
var router = express.Router();
var https = require('https');
var sheetService = require('../services/spreadsheets.js');

router.get('/', function(req,res){
	res.send('balance route works!');
});

router.post('/', function(req,res){
    console.log(req.body.email);
		var sheetName = 'testing';
		sheetService.getSpreadsheet(sheetName, function(sheet){
			sheetService.processBalanceRequest(req.body.email, sheet, function(message){
	    	//res.send(message+'<p><a href="/">Make Another Request</a>');
	    	res.send('<p>The account balance email has been sent.</p><p><a href="/">Make Another Request</a>');

	    });
		});


});





module.exports = router;

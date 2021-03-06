import Spreadsheet from '../node_modules/google-spreadsheet';
var mailService = require('../services/mailer.js');
var getUniqueId = require('uid');
var async = require('async');

function createScoutId (scoutRow, next) {
	scoutRow.scoutId = getUniqueId(50);
	next();
}

function saveNewScoutIdsToSheet(sheet) {
	sheet.getRows({
      offset: 2,
	  limit: 86
    }, function( err, rows ){
    	
      	console.log('Read '+rows.length+' rows');
		async.each(rows, 
			function (row) {
				createScoutId(row, function () {
					row.save();
					console.log('New ID '+ row.scoutid + ' assigned to ' + row.scoutname );
				});				
			},
			function(err) {
				if (!err) {
					console.log('All Scout IDs written to spreadsheet');
				} else {
					console.log(err);
				}
			}
		);
    });
}



module.exports = {
	//saveNewScoutIdsToSheet: saveNewScoutIdsToSheet
};
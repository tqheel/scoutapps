
'use strict';
var Spreadsheet = require ('google-spreadsheet');
var mailService = require('../services/mailer.js');
var getUniqueId = require('uid');
var async = require('async');

function getRows(sheet) {
	sheet.getRows({
      offset: 2
    }, function( err, rows ){
    	var writeOutput = function(row) {
    		console.log('New ID '+ row.scoutid + ' assigned to ' + row.scoutname );
    	};
      	console.log('Read '+rows.length+' rows');
		// for (let i = 0; i < rows.length; i++) {
		// 	console.log(rows[i].scoutname);
		// 	rows[i].scoutid = getUniqueId(50);
		// 	rows[i].save();
		// } 
		async.each(rows, 
			function (row) {
				
				// row.save(function(scout){
				row.scoutid = getUniqueId(50);
				writeOutput(scout);
				// });

				
			},
			function(err) {
			
			console.log('All Scout IDs written to spreadsheet');
			}
		);
    });
}

module.exports = {
	getRows: getRows
};
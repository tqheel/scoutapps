var getUniqueId = require('uid');
var async = require('async');
var Account = require ('../types/Account.js');

function createScoutId (scoutRow, next) {
	scoutRow.scoutId = getUniqueId(20);
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
function createMissingIds(sheet) {
	sheet.getRows({
      offset: 2,
	  limit: 86
    }, function( err, rows ){
    	
      	console.log('Read '+rows.length+' rows');
		async.each(rows, 
			function (row) {
				console.log(row.scoutname + ':' + row.scoutid);
				// if (row.scoutid === '' ){
				// 	createScoutId(row, function () {
				// 		row.save();
				// 		console.log('New ID '+ row.scoutid + ' assigned to ' + row.scoutname );
				// 	});	
				// }
							
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

//potentially destuctive in current form...do not use
// module.exports = {
// 	saveNewScoutIdsToSheet: saveNewScoutIdsToSheet,
// 	createMissingIds: createMissingIds
// };
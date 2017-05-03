'use strict';
let fs = require('fs');
let secretFile = 'secrets/admins.json';
let administrators = null;

fs.readFile(secretFile, 'utf8', function(err, data) {
		if(err){
			throw err;
		}
		administrators = JSON.parse(data);
});

function adminValidated (adminUserId, password) {
	for (let i = 0; i < administrators.length; i++) {
		if (adminUserId.toLowerCase() === administrators[i].adminUserId.toLowerCase()) {
			if (password === administrators[i].password) {
				return true;
			}
			return false;
		}
	}
}

function activateCard (adminUserId, password, contractId, next) {
	if (adminValidated(adminUserId, password)) {
		//lookup the contract
		//set activated field to true
		//if not found return false
		next(true);
	}
	next(false);
	
}

module.exports = {
	activateCard: activateCard
}
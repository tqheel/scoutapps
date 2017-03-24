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
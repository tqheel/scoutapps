'use strict';

class AccountSpreadsheet {
	constructor(scoutId, scoutName, startBalance, endBalance) {
		this.scoutId = scoutId;
		this.scoutName = scoutName;
		this.startBalance = startBalance;
		this.endBalance = endBalance;
	}
}

module.exports = AccountSpreadsheet;
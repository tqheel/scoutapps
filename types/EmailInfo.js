'use strict';

class EmailInfo {
	constructor(id, email, password, isDefault) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.isDefault = isDefault;
	}
}

module.exports = EmailInfo;
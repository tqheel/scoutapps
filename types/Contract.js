'use strict';

let uid = require('uid');

class Contract {
    constructor(
        scoutname,
        scoutemail,
        parentname,
        parentemail) {
            this.contractid = uid(20),
            this.scoutname = scoutname,
            this.scoutemail = scoutemail,
            this.parentname = parentname,
            this.parentemail = parentemail,
            this.timestamp = Date.now(),
            this.activated = false,
            this.corners = 4,
            this.dateactivated = null
        }
}

module.exports = Contract;
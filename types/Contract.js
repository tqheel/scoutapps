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
            this.parentemail = parentemail
        }
}

module.exports = Contract;
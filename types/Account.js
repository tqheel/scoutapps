'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Account = (function () {
    function Account(scoutId, scoutName, balance) {
        this.scoutId = scoutId;
        this.scoutName = scoutName;
        this.balance = balance;
        this._scoutId = scoutId;
        this._scoutName = scoutName;
        this._endBalance = balance;
    }
    return Account;
}());
var Account1617 = (function (_super) {
    __extends(Account1617, _super);
    function Account1617() {
        _super.apply(this, arguments);
    }
    return Account1617;
}(Account));

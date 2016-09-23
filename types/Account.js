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
    function Account1617(scoutid, scoutname, balance, rafting, backpacking, climbing, manatees, shooting, wwcenter, bootcamp, camporee, fortfisher, aquatics, durant, knob, recharter, fees, eagleprojects, northerntier, jambo) {
        _super.call(this, scoutid, scoutname, balance);
        this.scoutid = scoutid;
        this.scoutname = scoutname;
        this.balance = balance;
        this.rafting = rafting;
        this.backpacking = backpacking;
        this.climbing = climbing;
        this.manatees = manatees;
        this.shooting = shooting;
        this.wwcenter = wwcenter;
        this.bootcamp = bootcamp;
        this.camporee = camporee;
        this.fortfisher = fortfisher;
        this.aquatics = aquatics;
        this.durant = durant;
        this.knob = knob;
        this.recharter = recharter;
        this.fees = fees;
        this.eagleprojects = eagleprojects;
        this.northerntier = northerntier;
        this.jambo = jambo;
    }
    return Account1617;
}(Account));
exports.Account = Account1617;

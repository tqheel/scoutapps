'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
        var _this = _super.call(this, scoutid, scoutname, balance) || this;
        _this.scoutid = scoutid;
        _this.scoutname = scoutname;
        _this.balance = balance;
        _this.rafting = rafting;
        _this.backpacking = backpacking;
        _this.climbing = climbing;
        _this.manatees = manatees;
        _this.shooting = shooting;
        _this.wwcenter = wwcenter;
        _this.bootcamp = bootcamp;
        _this.camporee = camporee;
        _this.fortfisher = fortfisher;
        _this.aquatics = aquatics;
        _this.durant = durant;
        _this.knob = knob;
        _this.recharter = recharter;
        _this.fees = fees;
        _this.eagleprojects = eagleprojects;
        _this.northerntier = northerntier;
        _this.jambo = jambo;
        return _this;
    }
    return Account1617;
}(Account));
exports.Account = Account1617;

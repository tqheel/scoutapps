'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    constructor(scoutId, scoutName, balance) {
        this.scoutId = scoutId;
        this.scoutName = scoutName;
        this.balance = balance;
        this._scoutId = scoutId;
        this._scoutName = scoutName;
        this._endBalance = balance;
    }
}
class Account1617 extends Account {
    constructor(scoutid, scoutname, balance, rafting, backpacking, climbing, manatees, shooting, wwcenter, bootcamp, camporee, fortfisher, aquatics, durant, knob, recharter, fees, eagleprojects, northerntier, jambo) {
        super(scoutid, scoutname, balance);
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
}
exports.Account = Account1617;

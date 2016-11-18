'use strict';
var Trip = (function () {
    function Trip(tripid, name, tripmaster, destination, scoutseason, departuredate, returndate, youthfee, adultfee, permissionslip, healthform, grubmaster, grubfee, patrols, scouts) {
        this.tripid = tripid;
        this.name = name;
        this.tripmaster = tripmaster;
        this.destination = destination;
        this.scoutseason = scoutseason;
        this.departuredate = departuredate;
        this.returndate = returndate;
        this.youthfee = youthfee;
        this.adultfee = adultfee;
        this.permissionslip = permissionslip;
        this.healthform = healthform;
        this.grubmaster = grubmaster;
        this.grubfee = grubfee;
        this.patrols = patrols;
        this.scouts = scouts;
        this._tripid = tripid,
            this._name = name,
            this._tripmaster = tripmaster,
            this._destination = destination,
            this._scoutseason = scoutseason,
            this._departuredate = departuredate,
            this._returndate = returndate,
            this._youthfee = youthfee,
            this._adultfee = adultfee,
            this._permissionslip = permissionslip,
            this._healthform = healthform,
            this._grubmaster = grubmaster,
            this._grubfee = grubfee,
            this._patrols = patrols,
            this._scouts = scouts;
    }
    return Trip;
}());
exports.Trip = Trip;
var TripScout = (function () {
    function TripScout(name, patrol, paid, permission, healthform, medication, medinstructions, usescoutaccount) {
        this.name = name;
        this.patrol = patrol;
        this.paid = paid;
        this.permission = permission;
        this.healthform = healthform;
        this.medication = medication;
        this.medinstructions = medinstructions;
        this.usescoutaccount = usescoutaccount;
        this._name = name,
            this._patrol = patrol,
            this._paid = paid,
            this._permission = permission,
            this._healthform = healthform,
            this._medication = medication,
            this._medinstructions = medinstructions,
            this._usescoutaccount = usescoutaccount;
    }
    return TripScout;
}());
exports.TripScout = TripScout;

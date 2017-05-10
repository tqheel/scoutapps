'use strict';

class Trip {
    constructor(tripid, name, tripmaster, destination, scoutseason, 
        departuretime, returntime, youthfee, adultfee, permissionslip, healthform, 
        grubmaster, grubfee, patrols, scouts) {
        this.tripid = tripid;
        this.name = name;
        this.tripmaster = tripmaster;
        this.destination = destination;
        this.scoutseason = scoutseason;
        this.departuretime = departuretime;
        this.returntime = returntime;
        this.youthfee = youthfee;
        this.adultfee = adultfee;
        this.permissionslip = permissionslip;
        this.healthform = healthform;
        this.grubmaster = grubmaster;
        this.grubfee = grubfee;
        this.patrols = patrols;
        this.scouts = scouts;
    }

}
module.exports = Trip;
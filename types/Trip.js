'use strict';
const _docName = 'scout_apps', _sheetName = 'trips';
var sheetService = require('../services/spreadsheets');

class Trip {
    constructor(tripid, name, tripmaster, destination, scoutseason, 
        departuretime, returntime, youthfee, adultfee, reqpermissionslip, reqhealthform, 
        grubmaster, grubfee, patrols, scouts, description) {
        this.tripid = tripid;
        this.name = name;
        this.tripmaster = tripmaster;
        this.destination = destination;
        this.scoutseason = scoutseason;
        this.departuretime = departuretime;
        this.returntime = returntime;
        this.youthfee = youthfee;
        this.adultfee = adultfee;
        this.reqpermissionslip = reqpermissionslip;
        this.reqhealthform = reqhealthform;
        this.grubmaster = grubmaster;
        this.grubfee = grubfee;
        this.patrols = patrols;
        this.scouts = scouts;
        this.description = description;
    }
    add (trips) {
        trips.push(this);
    }
    create (next) {
        let trip = this;
        sheetService.getSpreadsheet(_sheetName, _docName, function(sheet) {
            sheetService.writeGenericRows(sheet, trip, function() {
                next();
            });
        });
        
    }
}
module.exports = Trip;
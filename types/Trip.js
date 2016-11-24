'use strict';
const _docName = 'scout_apps', _sheetName = 'trips';
var sheetService = require('../services/spreadsheets');
var uid = require('uid');

class Trip {
    constructor(name, tripmaster, destination, scoutseason, 
        mustertime, departuretime, returntime, youthfee, adultfee, reqpermissionslip, 
        reqhealthform, reqwaiver,
        grubmaster, grubfee, patrols, scouts, adults, description) {
        this.tripid = uid(8);
        this.name = name;
        this.tripmaster = tripmaster;
        this.destination = destination;
        this.scoutseason = scoutseason;
        this.mustertime = mustertime;
        this.departuretime = departuretime;
        this.returntime = returntime;
        this.youthfee = youthfee;
        this.adultfee = adultfee;
        this.reqpermissionslip = reqpermissionslip;
        this.reqhealthform = reqhealthform;
        this.reqwaiver = reqwaiver;
        this.grubmaster = grubmaster;
        this.grubfee = grubfee;
        this.patrols = patrols;
        this.scouts = JSON.stringify(scouts);
        this.adults = JSON.stringify(adults);
        this.description = description;
    }    
    create (next) {
        let trip = this;
        sheetService.getSpreadsheet(_sheetName, _docName, function(sheet) {
            sheetService.writeGenericRows(sheet, trip, function() {});
            next();
        });        
    }
    delete (next) {
        let trip = this;
        sheetService.getSpreadsheet(_sheetName, _docName, function(sheet) {
            sheetService.deleteRow(sheet, trip.tripid, next);
        });

    }
    getByTripId (id, next) {
        let trip = this;
        sheetService.getSpreadsheet(_sheetName, _docName, function(sheet) {
            sheet.getRows({
                offset: 1
                }, function( err, rows ){
                let matchedRows = [];
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].tripid === id) {
                        matchedRows.push(rows[i]);
                    }
                }
                next(matchedRows);
            });
        });
    }
}
module.exports = Trip;
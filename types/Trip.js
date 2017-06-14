'use strict';
const _docName = 'scout_apps', _sheetName = 'trips';
var sheetService = require('../services/spreadsheets');
var uid = require('uid');

class Trip {
    constructor(name, tripmaster, destination, scoutseason,
        mustertime, departuretime, returntime, youthfee, adultfee, reqpermissionslip,
        reqhealthform, reqwaiver, grubmaster, grubfee, patrols, scouts, adults, links,
        description) {
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
        this.links = JSON.stringify(links);
        this.description = description;
    }
    create(next) {
        let trip = this;
        sheetService.getSpreadsheet(_sheetName, _docName, function (sheet) {
            sheetService.writeGenericRows(sheet, trip, function () { });
            next();
        });
    }
    update(next) {
        let trip = this;
        trip.getByTripId(trip.tripid, function(tripRow) {
            tripRow.name = trip.name;
            tripRow.tripmaster = trip.tripmaster;
            tripRow.destination = trip.destination;
            tripRow.scoutseason = trip.scoutseason;
            tripRow.mustertime = trip.mustertime;
            tripRow.departuretime = trip.departuretime;
            tripRow.returntime = trip.returntime;
            tripRow.youthfee = trip.youthfee;
            tripRow.adultfee = trip.adultfee;
            tripRow.reqpermissionslip = trip.reqpermissionslip;
            tripRow.reqhealthform = trip.reqhealthform;
            tripRow.reqwaiver = trip.reqwaiver;
            tripRow.grubmaster = trip.grubmaster;
            tripRow.grubfee = trip.grubfee;
            tripRow.patrols = trip.patrols;
            tripRow.scouts = JSON.stringify(trip.scouts);
            tripRow.adults = JSON.stringify(trip.adults);
            tripRow.links = JSON.stringify(trip.links);
            tripRow.description = trip.description;
            tripRow.save(function() {
                console.log('Trip ' + trip.name + ' changes saved');
                next();
            });
        });                
    }
    delete(next) {
        let trip = this;
        sheetService.getSpreadsheet(_sheetName, _docName, function (sheet) {
            sheetService.deleteRow(sheet, trip.tripid, next);
        });

    }
    getByTripId(id, next) {
        let trip = this;
        sheetService.getSpreadsheet(_sheetName, _docName, function (sheet) {
            sheet.getRows({
                offset: 1
            }, function (err, rows) {
                let matchedRows = [];
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].tripid === id) {
                        matchedRows.push(rows[i]);
                    }
                }
                trip = matchedRows[0];
                next(trip);
            });
        });
    }
    getTripsBySeason(scoutingSeason, next) {
        let trips = [];
        sheetService.getSpreadsheet(_sheetName, _docName, function (sheet) {
            sheet.getRows({
                offset: 1
            }, function (err, rows) {
                let matchedRows = [];
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].scoutseason === scoutingSeason) {
                        matchedRows.push(rows[i]);
                    }
                }
                next(matchedRows);
            });
        });
    }
}
module.exports = Trip;
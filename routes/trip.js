'use strict';
var express = require('express');
var router = express.Router();
var viewName = 'trip';
var Trip = require('../types/Trip.js');
var scoutingSeason = '2016-2017';
var utils = require('../utils/common.js');

function getTripDetails(id) {

}

router.get('/', function(req,res){
	res.render(viewName, { 
        title: 'Troop Trips',
        mode: 'Create a New Trip',
        scoutingSeason: scoutingSeason
     });
});

router.get('/:tripId', function (req, res) {
        let trip = new Trip();
        trip.getByTripId(req.params.tripId, function (tripDetails) {
                console.log('Got trip with a name of ' + tripDetails.name);
        });
});

router.post('/', function(req, res) {
        let trip = req.body;
        let newTrip = new Trip(
                trip.name,
                trip.tripmaster,
                trip.destination,
                trip.scoutseason,
                trip.muster_time,
                trip.departure_time + ' ' + trip.departure_date,
                trip.return_time + ' ' + trip.return_date,
                trip.youthfee,
                trip.adultfee,
                trip.reqpermissionslip,
                trip.reqhealthform,
                trip.reqwaiver,
                trip.grubmaster,
                trip.grubfee,
                [], [], [], [],
                trip.description
        );
        newTrip.create(function() {
                res.render('trip_details', {
                        tripId: newTrip.tripid,
                        name: newTrip.name,
                        tripMaster: newTrip.tripmaster,
                        destination: newTrip.destination,
                        scoutSeason: newTrip.scoutseason,
                        departureTime: newTrip.departuretime,
                        musterTime: newTrip.mustertime,
                        returnTime: newTrip.returntime,
                        youthFee: newTrip.youthfee,
                        adultFee: newTrip.adultfee,
                        reqPermissionSlip: utils.convertBoolToYesNo(newTrip.reqpermissionslip),
                        reqHealthForm: utils.convertBoolToYesNo(newTrip.reqhealthform),
                        reqWaiver: utils.convertBoolToYesNo(newTrip.reqwaiver),
                        grubMaster: newTrip.grubmaster,
                        grubFee: newTrip.grubfee,
                        description: newTrip.description
                });
        });
        
});

module.exports = router;
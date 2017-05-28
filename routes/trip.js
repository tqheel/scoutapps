'use strict';
var express = require('express');
var router = express.Router();
var viewName = 'trip';
var Trip = require('../types/Trip.js');
var scoutingSeason = '2016-2017';
var utils = require('../utils/common.js');

function convertBoolsToYesNo(boolsArray, next) {
        let convertedBoolArray = [];
        for (let i=0; i < boolsArray.length; i++) {
                utils.convertBoolToYesNo(boolsArray[i], function(yesNoVal) {
                        convertedBoolArray.push(yesNoVal);
                });          
        }
        next(convertedBoolArray);
}

function renderTripDetails(trip, res, convertedBoolArray) {
        let self = trip;
        res.render('trip_details', {
                mode: 'Trip Details',
                tripId: self.tripid,
                name: self.name,
                tripMaster: self.tripmaster,
                destination: self.destination,
                scoutSeason: self.scoutseason,
                departureTime: self.departuretime,
                musterTime: self.mustertime,
                returnTime: self.returntime,
                youthFee: self.youthfee,
                adultFee: self.adultfee,
                reqPermissionSlip: convertedBoolArray[0],
                reqHealthForm:convertedBoolArray[1],
                reqWaiver: convertedBoolArray[2],
                grubMaster: self.grubmaster,
                grubFee: self.grubfee,
                description: self.description
        });
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
                trip = tripDetails;
                let boolArray = [
                        trip.reqpermissionslip,
                        trip.reqhealthform,
                        trip.reqwaiver
                ];

                convertBoolsToYesNo(boolArray, function (convertedBoolArray) {
                        renderTripDetails(trip, res, convertedBoolArray);
                }); 
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
                let self = newTrip;
                //convert bool values before rendering
                let boolArray = [
                        self.reqpermissionslip,
                        self.reqhealthform,
                        self.reqwaiver
                ];

                convertBoolsToYesNo(boolArray, function (convertedBoolArray) {
                        renderTripDetails(self, res, convertedBoolArray);
                });               
        });
});

router.post('/edit', function(req, res) {
        let tripId = req.body.tripId;
        let trip = new Trip();
        trip.getByTripId(tripId, (retreivedTrip) => {
                res.send(retreivedTrip);
        });
        
});

module.exports = router;
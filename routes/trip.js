'use strict';
var express = require('express');
var router = express.Router();
var viewName = 'trip';
var Trip = require('../types/Trip.js');
var scoutingSeason = '2016-2017';

router.get('/', function(req,res){
	res.render(viewName, { 
        title: 'Troop Trips',
        mode: 'Create a New Trip',
        scoutingSeason: scoutingSeason
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
                        description: newTrip.description
                });
        });
        
});

module.exports = router;
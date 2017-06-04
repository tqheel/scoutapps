'use strict';
var express = require('express');
var router = express.Router();
var crudViewname = 'trip';
var detailsViewName = 'trip_details';
var Trip = require('../types/Trip.js');
var scoutingSeason = '2016-2017';
var utils = require('../utils/common.js');
const editMode = 'edit';
const createMode = 'create';
const editActionUrl = './';

function convertBoolsToYesNo(boolsArray, next) {
        let convertedBoolArray = [];
        for (let i = 0; i < boolsArray.length; i++) {
                utils.convertBoolToYesNo(boolsArray[i], function (yesNoVal) {
                        convertedBoolArray.push(yesNoVal);
                });
        }
        next(convertedBoolArray);
}

function renderTripDetails(trip, res, convertedBoolArray, viewToRender, mode) {
        let self = trip;
        res.render(viewToRender, {
                mode: mode,
                modeLabel: (mode === editMode ? 'Edit Trip Details' : 'Create a New Trip'),
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
                reqHealthForm: convertedBoolArray[1],
                reqWaiver: convertedBoolArray[2],
                grubMaster: self.grubmaster,
                grubFee: self.grubfee,
                description: self.description,
                buttonLabel: (mode === editMode) ? 'Update' : 'Create'
        });
}

function getTripById(req, res, viewToRender, mode) {
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
                        renderTripDetails(trip, res, convertedBoolArray, viewToRender, mode);
                });
        });
}

router.get('/', function(req, res) {
        res.send('This should show a list of trip details links.')
});
router.get('/create', function (req, res) {
        res.render(crudViewname, {
                mode: createMode,
                title: 'Troop Trips',
                modeLabel: 'Create a New Trip',
                scoutingSeason: scoutingSeason,
                reqPermissionSlip: 'Yes',
                reqHealthForm: 'No',
                reqWaiver: 'No',
                buttonLabel: 'Create'
        });
});

//show read-only view of trip
router.get('/:tripId', function (req, res) {
        getTripById(req, res, detailsViewName, 'view');
});

//edit an individual trip
router.get('/edit/:tripId', function (req, res) {
        getTripById(req, res, crudViewname, editMode);
});

router.post('/create', function (req, res) {
        let trip = req.body;
        let newTrip = new Trip(
                trip.name,
                trip.tripmaster,
                trip.destination,
                trip.scoutseason,
                trip.muster_time,
                trip.departure_time,
                trip.return_time,
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
        newTrip.create(function () {
                let self = newTrip;
                //convert bool values before rendering
                let boolArray = [
                        self.reqpermissionslip,
                        self.reqhealthform,
                        self.reqwaiver
                ];

                convertBoolsToYesNo(boolArray, function (convertedBoolArray) {
                        renderTripDetails(self, res, convertedBoolArray, detailsViewName, createMode);
                });
        });
});

module.exports = router;
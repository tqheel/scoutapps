'use strict';
var chai = require('chai');
var expect = chai.expect;
var Trip = require('../../types/Trip');
var TripScout = require('../../types/TripScout');
var TripAdult = require('../../types/TripAdult');
var sheetService = require('../../services/spreadsheets');

describe('Trip()', function() {
    it('Trip constructor should return a new Trip type.', function() {
        var trip = new Trip();
        expect(trip != null);
    }); 
    
});

describe('Trip()', () => {
    let patrols = [
        'patrol 1', 'patrol 77'
    ];
    let scout1 = new TripScout(
        'bill',
        patrols[1]            
    );      
    let adult1 = new TripAdult(
        'Todd',
        true,
        3,
        'Ford F-150'
    );  
    let adult2 = new TripAdult(
        'Sam',
        true,
        6,
        'Mazda 3'
    );
    let trip = new Trip(
        'name',
        'tripmaster name',
        'destination',
        '2016-2017',
        '4:45',
        'Sat Nov 19 2016 14:50:27 GMT-0500 (Eastern Standard Time)',
        'Sat Nov 19 2016 14:56:22 GMT-0500 (Eastern Standard Time)',
        5.25,
        25.34,
        true,
        true,
        false,
        'i am he',
        45.67,
        patrols,
        [scout1],
        [adult1, adult2],
        'this is my description'
    );
    beforeEach((done) => {
        //deserialize the scouts and adults stringified objects back to json
        trip.scouts = JSON.parse(trip.scouts);
        trip.adults = JSON.parse(trip.adults);
        done();
    });
    it('Trip constructor sets all parameters properly, i.e., they are in corrent order and named correctly', () => {
        
        expect(trip.tripid.length).to.equal(8);
        expect(trip.name).to.equal('name');
        expect(trip.tripmaster).to.equal('tripmaster name');
        expect(trip.destination).to.equal('destination');
        expect(trip.scoutseason).to.equal('2016-2017');
        expect(trip.departuretime).to.equal('Sat Nov 19 2016 14:50:27 GMT-0500 (Eastern Standard Time)');
        expect(trip.returntime).to.equal('Sat Nov 19 2016 14:56:22 GMT-0500 (Eastern Standard Time)');
        expect(trip.youthfee).to.equal(5.25);
        expect(trip.adultfee).to.equal(25.34);
        expect(trip.reqpermissionslip).to.equal(true);
        expect(trip.reqhealthform).to.equal(true);
        expect(trip.grubmaster).to.equal('i am he');
        expect(trip.grubfee).to.equal(45.67);
        expect(trip.patrols).to.deep.equal([
            'patrol 1',
            'patrol 77'
        ]);        
        expect(trip.scouts[0].name).to.deep.equal('bill');
        expect(trip.scouts[0].patrol).to.deep.equal('patrol 77');
        expect(trip.adults[1].carmakemodel).to.deep.equal('Mazda 3');
        expect(trip.description).to.equal('this is my description');
        expect(trip.mustertime).to.equal('4:45');
        expect(trip.reqwaiver).to.equal(false);
    });
});

describe('create()', () => {
    var tripId = null;
    beforeEach((done) => {
        let patrols = [
        'patrol 1', 'patrol 77'
        ];
        let scout1 = new TripScout(
            'bill',
            patrols[1]            
        );
        let adult1 = new TripAdult(
            'Todd',
            true,
            3,
            'Ford F-150'
        );  
        let adult2 = new TripAdult(
            'Sam',
            true,
            6,
            'Mazda 3'
        );        
        let trip = new Trip(
            'name',
            'tripmaster name',
            'destination',
            '2016-2017',
            '4:45',
            'Sat Nov 19 2016 14:50:27 GMT-0500 (Eastern Standard Time)',
            'Sat Nov 19 2016 14:56:22 GMT-0500 (Eastern Standard Time)',
            5.25,
            25.34,
            true,
            true,
            false,
            'i am he',
            45.67,
            patrols,
            [scout1],
            [adult1,adult2],
            'this is my description'
        );
        tripId = trip.tripid;
        trip.create(done);
          
    });
    let matchedTrips = null;
    beforeEach((done) => {
        let trip = new Trip();
        trip.tripid = tripId;        
        trip.getByTripId(trip.tripid, function (trips) {
            matchedTrips = trips; 
            done();
        });        
    });
    it('create() should add new Trip and getbyTripId should return the trips with the matching ID', () => {
        expect(matchedTrips[0].departuretime).to.equal('Sat Nov 19 2016 14:50:27 GMT-0500 (Eastern Standard Time)');
        expect(matchedTrips[0].description).to.equal('this is my description');
    });  
});

describe('delete()', () => {
    let trip = new Trip('sdfsdfsdf1234');
    let matchedTrips = [];
    beforeEach((done) => {      
        trip.getByTripId(trip.tripid, function () {
            done();
        });   
    });
    beforeEach((done) => {
        trip.delete(function() {
            done();            
        });           
    });
    it('delete() should delete the rows with the matching IDs', () => {                       
        trip.getByTripId(trip.tripid, function (trips) {
            matchedTrips = trips;
        });
        expect(matchedTrips.length).to.equal(0);
    });    
});

describe('Trip.tripId auto ID creation', () => {
    let trip = new Trip(null);
    it('null Trip.tripid in constructor should create an 8 char ID automatically', () => {
        console.log(trip.tripid);
        expect(trip.tripid).to.not.equal(null);
        expect(trip.tripid.length).to.equal(8);
    });
});
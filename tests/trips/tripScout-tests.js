'use strict';
var chai = require('chai');
var expect = chai.expect;
var TripScout = require('../../types/TripScout');

describe('TripScout()', function() {
    it('TripScout constructor sets all properties correctly.', () => {
        let tripScout = new TripScout(
            'Billy Joe Bob',
            'vultures',
            false,
            true,
            false,
            true,
            '2 pills before bed.',
            false,
            true,
            ['eggs','bees']
        );
        expect(tripScout).to.not.equal(null);
        expect(tripScout.name).to.equal('Billy Joe Bob');
        expect(tripScout.patrol).to.equal('vultures');
        expect(tripScout.paid).to.equal(false);
        expect(tripScout.haspermission).to.equal(true);
        expect(tripScout.hashealthform).to.equal(false);
        expect(tripScout.reqmedication).to.equal(true);
        expect(tripScout.medinstructions).to.equal('2 pills before bed.');
        expect(tripScout.usescoutaccount).to.equal(false);
        expect(tripScout.haswaiversigned).to.equal(true);
        expect(tripScout.allergies).to.deep.equal(['eggs', 'bees']);
    });
});
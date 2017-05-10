'use strict';
var chai = require('chai');
var expect = chai.expect;
var TripAdult = require('../../types/TripAdult');

describe('TripAdult()', () => {
    it('TripAdult constructor should set all props correctly.', () => {
        let adult = new TripAdult(
            'Todd',
            true,
            3,
            'Ford F-150',
            true,
            false,
            true,
            false,
            true,
            ['wfa','weather'],
            ['everything','beer']
        ); 
        expect(adult.name).to.equal('Todd');
        expect(adult.isdriver).to.equal(true);
        expect(adult.passengercapacity).to.equal(3);
        expect(adult.carmakemodel).to.equal('Ford F-150');
        expect(adult.yptcurrent).to.equal(true);
        expect(adult.healthformscurrent).to.equal(false);
        expect(adult.haswaiversigned).to.equal(true);
        expect(adult.isgrubmaster).to.equal(false);
        expect(adult.feespaid).to.equal(true);
        expect(adult.certifications).to.deep.equal(['wfa', 'weather']);
        expect(adult.allergies).to.deep.equal(['everything','beer']);
    });
});
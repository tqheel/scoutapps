'use strict';
var chai = require('chai');
var expect = chai.expect;
var TripAdult = require('../../types/TripAdult');

describe('TripAdult()', () => {
    it('TripAdult constructor should set all props correctly.', () => {
        let adult1 = new TripAdult(
            'Todd',
            true,
            3,
            'Ford F-150'
        );  
    });
});
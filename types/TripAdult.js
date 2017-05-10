'use strict';

class TripAdult {
    constructor(name, isdriver, passengercapacity, carmakemodel, yptcurrent, healthformscurrent,
        haswaiversigned, isgrubmaster, feespaid, certifications, allergies) {
            this.name = name;
            this.isdriver = isdriver;
            this.passengercapacity = passengercapacity;
            this.carmakemodel = carmakemodel;
            this.yptcurrent = yptcurrent;
            this.healthformscurrent = healthformscurrent;
            this.haswaiversigned = haswaiversigned;
            this.isgrubmaster = isgrubmaster;
            this.feespaid = feespaid;
            this.certifications = certifications; //array of strings
            this.allergies = allergies; // array of strings
        }
}

module.exports = TripAdult;
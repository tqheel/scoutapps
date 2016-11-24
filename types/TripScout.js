'use strict';

class TripScout {
    constructor(name, patrol, paid, haspermission, hashealthform, 
        reqmedication, medinstructions, usescoutaccount, haswaiversigned,
        allergies) {
        this.name = name;
        this.patrol = patrol;
        this.paid = paid;
        this.haspermission = haspermission;
        this.hashealthform = hashealthform;
        this.reqmedication = reqmedication;
        this.medinstructions = medinstructions;
        this.usescoutaccount = usescoutaccount;
        this.haswaiversigned = haswaiversigned;
        this.allergies = allergies;
    }
}
module.exports = TripScout;
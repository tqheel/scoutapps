'use strict';

class TripScout {
    constructor(name, patrol, paid, permission, healthform, medication, medinstructions, usescoutaccount) {
        this.name = name;
        this.patrol = patrol;
        this.paid = paid;
        this.permission = permission;
        this.healthform = healthform;
        this.medication = medication;
        this.medinstructions = medinstructions;
        this.usescoutaccount = usescoutaccount;
    }
}
module.exports = TripScout;
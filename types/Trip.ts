'use strict';

class Trip {
    _tripid: number;
    _name: string;
    _tripmaster: string;
    _destination: string;
    _scoutseason: string;
    _departuredate: Date;
    _returndate: Date;
    _youthfee: number;
    _adultfee: number;
    _permissionslip: boolean;
    _healthform: boolean;
    _grubmaster: string;
    _grubfee: number;
    _patrols: string[];
    _scouts: TripScout[];
    constructor(public tripid: number, public name: string, public tripmaster: string,
        public destination: string, public scoutseason: string, public departuredate: Date,
        public returndate: Date, public youthfee: number, public adultfee: number, 
        public permissionslip: boolean, public healthform: boolean, public grubmaster: string,
        public grubfee: number, public patrols: string[], public scouts: TripScout[]) {
            this._tripid = tripid,
            this._name = name,
            this._tripmaster = tripmaster,
            this._destination = destination,
            this._scoutseason = scoutseason,
            this._departuredate = departuredate,
            this._returndate = returndate,
            this._youthfee = youthfee,
            this._adultfee = adultfee,
            this._permissionslip = permissionslip,
            this._healthform = healthform,
            this._grubmaster = grubmaster,
            this._grubfee = grubfee,
            this._patrols = patrols,
            this._scouts = scouts
        }
}

class TripScout {
    _name: string;
    _patrol: string;
    _paid: boolean;
    _permission: boolean;
    _healthform: boolean;
    _medication: boolean;
    _medinstructions: string;
    _usescoutaccount: boolean
    constructor(public name: string, public patrol: string, public paid: boolean,
        public permission: boolean, public healthform: boolean, public medication: boolean, 
        public medinstructions: string, public usescoutaccount: boolean) {
            this._name = name,
            this._patrol = patrol,
            this._paid = paid,
            this._permission = permission,
            this._healthform = healthform,
            this._medication = medication,
            this._medinstructions = medinstructions,
            this._usescoutaccount = usescoutaccount
        }
}

export {
    Trip as Trip,
    TripScout as TripScout
}


'use strict';

class Account {
		_scoutId: string;
		_scoutName: string;
		_endBalance: number;
		constructor(public scoutId: string, public scoutName: string, public balance: number){
			this._scoutId = scoutId;
			this._scoutName = scoutName;
			this._endBalance = balance;
		}
}

class Account1617 extends Account {
	_rafting: number;
	_backpacking: number;
	_fishing: number;
	_climbing: number;
	_manatees: number;
	_shooting: number;
	_wwcenter: number;
	_bootcamp: number;
	_camporee: number;
	_fortfisher: number;
	_aquatics: number;
	_durant: number;
	_knob: number;
	_recharter: number;
	_fees: number;
	_eagleprojects: number;
	_northerntier: number;
	_jambo: number;

	constructor( public rafting: number, public backpacking: number, public climbing: number){

	}	
}



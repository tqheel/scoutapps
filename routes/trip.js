'use strict';
var express = require('express');
var router = express.Router();
var viewName = 'trip';
var scoutingSeason = '2016-2017';

router.get('/', function(req,res){
	res.render(viewName, { 
        title: 'Troop Trips',
        mode: 'Create a New Trip',
        scoutingSeason: scoutingSeason
     });
});

module.exports = router;
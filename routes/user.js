'use strict';
var express = require('express');
var router = express.Router();


router.get('/nah', function(req, res) {
  res.render('admin-unauthorized');
});

module.exports = router;

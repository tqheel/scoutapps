var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Scout Account Balance Retrieval Bot' });
});

module.exports = router;

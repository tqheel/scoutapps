var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('policy', { title: 'Troop 212 Policies and Procedures' });
});

router.get('/tech-policy', function(req, res) {
  res.render('tech-policy', { title: 'Troop 212 Electronic Device Usage Policy' });
});

router.get('/tech-contract', function(req, res) {
  res.render('tech-contract', { title: 'Troop 212 Technology Chip Contract' });
});

router.get('/tech-card', function(req, res) {
  res.render('tech-card', { title: 'Troop 212 Technology Chip Honor Card' });
});

module.exports = router;
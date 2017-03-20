var express = require('express');
var router = express.Router();
let Contract = require('../types/Contract');
let contractService = require('../services/contract');

function processContract(contract, next) {
  //TODO: Create Tech Contract Service
  console.log('here is where the contract will be processed by the service.');
  contractService.logContractSubmission(contract, next);
}

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

router.post('/contract', function(req, res) {
  //TODO: create spreadsheet to store contract info and submit
  let contract = new Contract(
    req.body.scoutName,
    req.body.scoutEmail,
    req.body.parentName,
    req.body.parentEmail
  );
  console.log(contract);
  processContract(contract, function () {

    res.render('tech-contract-success', {
    title: 'Contract Submitted. Check your email for a link to '
  });
 });
});

module.exports = router;
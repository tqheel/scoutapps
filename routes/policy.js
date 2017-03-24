var express = require('express');
var router = express.Router();
let Contract = require('../types/Contract');
let contractService = require('../services/contract');
let barcodeService = require('../services/barcode');
let cardAdminPageTitle = 'Tech Chip Honor Card Admin Area';


function processContract(contract, next) {
  contractService.logContractSubmission(contract, next);
}

router.get('/', function(req, res) {
  res.render('policy', { title: 'Troop 212 Policies and Procedures' });
});

router.get('/admin/card/:contractId', function (req, res) {
  if (req.params.contractId) {
    let contractId = req.params.contractId    
    contractService.getContractById(contractId, function (contract) {
      res.render('tech-card-admin', { 
        title: cardAdminPageTitle,
        scoutName: contract.scoutname,
        contractId: contract.contractid,
        activated: contract.activated,
        corners: contract.corners
      });
    });
  }
});

router.get('/admin/card', function(req, res) {
    res.render('tech-card-admin', { 
        title: cardAdminPageTitle
      });
});

router.get('/tech-policy', function(req, res) {
  res.render('tech-policy', { title: 'Troop 212 Electronic Device Usage Policy' });
});

router.get('/tech-contract', function(req, res) {
  res.render('tech-contract', { title: 'Troop 212 Technology Chip Contract' });
});

router.get('/tech-card/:contractId', function(req, res) {
  contractService.getContractById(req.params.contractId, function(contract) {
    barcodeService.createBarcodeUrl(contract, function(barcodeUrl) {
      res.render('tech-card', { 
        title: 'Troop 212 Technology Chip Honor Card',
        scoutName: contract.scoutname,
        barcodeUrl: barcodeUrl
       });
    });
  });  
});

router.post('/contract', function(req, res) {
  let contract = new Contract(
    req.body.scoutName,
    req.body.scoutEmail,
    req.body.parentName,
    req.body.parentEmail
  );
  processContract(contract, function () {
    res.render('tech-contract-success', {
    title: 'Contract Submitted.'
  });
 });
});

module.exports = router;
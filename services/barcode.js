/*
    The following is an example of a link to the policy contract page

    http://api-bwipjs.rhcloud.com/?bcid=azteccode&text=http%3A%2F%2Ftroop212-apps.azurewebsites.net%2Fpolicy%2Ftech-contract&format=full
*/
'use strict';

let barCodeBaseUrl = 'http://api-bwipjs.rhcloud.com/?bcid=';
let barCodeType = 'azteccode&text=';
let troop212TechChipSegment = '=http%3A%2F%2Ftroop212-apps.azurewebsites.net%2Fpolicy%2Ftech-card%2F';
let finalSegment = '&format=full';

function createBarcodeUrl (contract, next) {
    //if Little Bobby White Easter Egg contract
    if (contract.contractid === 'S7-421-16-1') {
        let url = 'http://api-bwipjs.rhcloud.com/?bcid=azteccode&text=http%3A%2F%2Fwww.classb.com%2Fwp-content%2Fuploads%2F2014%2F11%2Fbobwhite-tough-600h-8.png&format=full';
        next(url);
    }
    else {
        let url = barCodeBaseUrl + barCodeType + troop212TechChipSegment + contract.contractid + finalSegment;
        next(url);
    }
    
}

module.exports = {
    createBarcodeUrl: createBarcodeUrl
}
/*
    The following is an example of a link to the policy contract page

    http://api-bwipjs.rhcloud.com/?bcid=azteccode&text=http%3A%2F%2Ftroop212-apps.azurewebsites.net%2Fpolicy%2Ftech-contract&format=full
*/
'use strict';

function createBarcodeUrl(req, contract, next) {
    let host = req.get('host');
    let hostProtocol = req.protocol;
    let barCodeBaseUrl = 'http://bwipjs-api.metafloor.com/?bcid=';
    let barCodeType = 'azteccode&text=';
    let troop212TechChipSegment = '=' + hostProtocol + '://' + host + '/policy/admin/card/';
    troop212TechChipSegment = encodeURIComponent(troop212TechChipSegment);
    let finalSegment = '&format=full';
    //if Little Bobby Tables Easter Egg contract
    if (contract.contractid === 'S7-421-16-1') {
        //let url = 'http://api-bwipjs.rhcloud.com/?bcid=azteccode&text=http%3A%2F%2Fwww.classb.com%2Fwp-content%2Fuploads%2F2014%2F11%2Fbobwhite-tough-600h-8.png&format=full';
        let url = 'http://bwipjs-api.metafloor.com/?bcid=azteccode&text=https%3A%2F%2Fxkcd.com%2F327%2F&format=full';
        next(url);
    }
    else {
        let url = barCodeBaseUrl + barCodeType + troop212TechChipSegment + 
            contract.contractid + finalSegment;
        next(url);
    }

}

module.exports = {
    createBarcodeUrl: createBarcodeUrl
}
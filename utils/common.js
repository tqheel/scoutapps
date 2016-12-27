'use strict';

function isEmptyOrWhitespace(str){
    return str === null || str.match(/^ *$/) !== null;
}

function deDuplicateArray(elements) {
    return Array.from(new Set(elements));
}

function constructEmailRecipientsFromArrayOfStrings(addressArray, next) {
    let recipients = '';
    for (let i = 0; i < addressArray.length; i++) {
        let end = (i === addressArray.length - 1) ? '' : ', ';
        recipients = recipients + addressArray[i] + end;
    }
    next(recipients);
}

function buildHtmlBlockFromStringArray(arrayOfStrings, next) {
    var htmlBlock = '';
    var startPara = '<p>';
    var endPara = '</p>';
    for (let i = 0; i < arrayOfStrings.length; i++) {
        htmlBlock = htmlBlock + startPara + arrayOfStrings[i] + endPara;
    }
    next(htmlBlock);
}

function convertBoolToYesNo (value) {
    return (value) ? 'Yes' : 'No';
}

module.exports = {
    isEmptyOrWhitespace: isEmptyOrWhitespace,
    deDuplicateArray: deDuplicateArray,
    constructEmailRecipientsFromArrayOfStrings: constructEmailRecipientsFromArrayOfStrings,
    buildHtmlBlockFromStringArray: buildHtmlBlockFromStringArray,
    convertBoolToYesNo: convertBoolToYesNo
};
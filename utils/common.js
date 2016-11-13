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

module.exports = {
    isEmptyOrWhitespace: isEmptyOrWhitespace,
    deDuplicateArray: deDuplicateArray,
    constructEmailRecipientsFromArrayOfStrings: constructEmailRecipientsFromArrayOfStrings
};
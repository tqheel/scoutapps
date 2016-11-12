function isEmptyOrWhitespace(str){
    return str === null || str.match(/^ *$/) !== null;
}

function deDuplicateArray(elements) {
    return Array.from(new Set(elements));
}

module.exports = {
    isEmptyOrWhitespace: isEmptyOrWhitespace,
    deDuplicateArray: deDuplicateArray
};
function isEmptyOrWhitespace(str){
    return str === null || str.match(/^ *$/) !== null;
}

module.exports = {
    isEmptyOrWhitespace: isEmptyOrWhitespace
};
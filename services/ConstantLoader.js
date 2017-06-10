'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var globalConstantsFilePath = './config/constants.json';
var displayName = 'Global Constants File';
var fs = require('fs');
var ConstantLoader = (function () {
    function ConstantLoader() {
    }
    ConstantLoader.prototype.constuctor = function () {
        this.configFilePath = globalConstantsFilePath;
        this.configName = displayName;
    };
    ConstantLoader.prototype.load = function () {
        fs.readFile(this.configFilePath, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            return JSON.parse(data);
        });
    };
    return ConstantLoader;
}());
exports.ConstantLoader = ConstantLoader;

'use strict';
const globalConstantsFilePath: string = './config/constants.json';
const displayName: string = 'Global Constants File';
const fs = require('fs');

export class ConstantLoader implements ConfigLoaderInterface {
    configFilePath: string;
    configName: string;
    
    constuctor() {
        this.configFilePath = globalConstantsFilePath;
        this.configName = displayName
    }

    load() {
        fs.readFile(this.configFilePath, 'utf8', function (err, data) {
                if (err) {
                        throw err;
                }
                
                return JSON.parse(data);
        });
    }
}
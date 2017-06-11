'use strict';
const fs = require('fs');
class ConfigLoader {
    constuctor(filePath, displayName) {
        this.configFilePath = filePath;
        this.configName = displayName;
    }
    load(next) {
        let loader = this;
        console.log('configpath=>'+loader.configFilePath);
        fs.readFile('./config/constants.json', 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            console.log(data);
            next(JSON.parse(data));
        });
    }
}
module.exports = ConfigLoader;

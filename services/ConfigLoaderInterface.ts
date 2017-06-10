'use strict';

interface ConfigLoaderInterface {
    configFilePath: string;
    configName: string;
    load();
}
'use strict';

const defaultConfig = '/config-default.js';
// 可设定为绝对路径，如 /opt/product/config-override.js
const overrideConfig = '/config-prod.js';
const testConfig = '/config-test.js';

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}`);
    config = require(__dirname + testConfig);
} else {
    console.log(`Load ${defaultConfig}`);
    config = require(__dirname + defaultConfig);

    try {
        if (fs.statSync(__dirname + overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}`);
            Object.assign(config, require(__dirname + overrideConfig));
        }
    } catch (error) {
        console.log(`Cannot load ${overrideConfig}.`);
        console.log(error);
    }
};

module.exports = config;
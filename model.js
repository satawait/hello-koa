'use strict';
const fs = require('fs');
const db = require('./models/db');

module.exports = {};

var files = fs.readdirSync(__dirname + '/models');
var js_files = files.filter((f) => {
    return f.endsWith('.js');
});

js_files.forEach(function(f) {
    console.log(`process models: ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
});

module.exports.sync = () => {
    return db.sync();
};
'use strict';
const fs = require('fs');
const router = require('koa-router')();

function addMapping(router, mapping) {
    console.log(typeof mapping);
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    };
};

function addControllers(router, dir) {
    var files = fs.readdirSync(__dirname + '/' + dir);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    js_files.forEach(function(f) {
        console.log(`process controller: ${f}...`);
        var mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
};

module.exports = function(dir) {
    var dir = dir || 'controllers',
        router = require('koa-router')();

    addControllers(router, dir);
    return router.routes();
};
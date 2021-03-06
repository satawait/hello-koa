'use strict';

// var fn_hello = async(ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.type = 'text/html';
//     ctx.response.body = `<h1>hello ${name}</h1>`;
// };

var fn_hello = async(ctx, next) => {
    var name = ctx.params.name;
    ctx.render('hello.html', {
        title: `welcome ${name}`,
        name: name
    });
};

module.exports = {
    'GET /hello': fn_hello
};
'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const app = new Koa();

app.use(async(ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

// app.use(async(ctx, next) => {
//     const start = new Date().getTime();
//     await next();
//     const ms = new Date().getTime() - start;
//     console.log(`total time: ${ms}`);
// });

// app.use(async(ctx, next) => {
//     await next();
//     console.log('server will start!');
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>hello koa2</h1>';
// });
// router.get('/:name', async(ctx, next) => {
//     const name = ctx.params.name;
//     ctx.response.type = 'text/html';
//     ctx.response.body = `<h1>hello ${name}</h1>`;
// });

app.use(bodyParser());

// router.get('/', async(ctx, next) => {
//     ctx.response.type = 'text/html';
//     ctx.response.body = `<h1>Index</h1>
//     <form action="/signin" method="post">
//         <p>Name: <input name="name" value="koa"></p>
//         <p>Password: <input name="password" type="password"></p>
//         <p><input type="submit" value="Submit"></p>
//     </form>`;
// });

// router.post('/signin', async(ctx, next) => {
//     var name = ctx.request.body.name || '',
//         password = ctx.request.body.password || '';
//     console.log(`name: ${name}, password: ${password}`);
//     if (name === 'koa' && password === '123456') {
//         ctx.response.body = `<h1>hello ${name}</h1>`;
//     } else {
//         ctx.response.body = `<h1>login failed!</h1>
//         <p><a href='/'>try again</a></p>`;
//     }
// });



app.use(controller());

app.listen(3000);
console.log('app start!');
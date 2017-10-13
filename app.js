'use strict';

const Koa = require('koa');
// const webSocket = require('ws');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const staticFiles = require('./static-files');
const templating = require('./templating');
const rest = require('./rest');
// const util = require('./util');

const app = new Koa();

// const WebSocketServer = webSocket.server;

const isProduction = process.env.NODE_ENV === 'production';

// const Sequelize = require('sequelize');
// const config = require('./config');

// var sequelize = new Sequelize(config.database, config.username, null, {
//     host: config.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });

// var Pet = sequelize.define('pet', {
//     id: {
//         type: Sequelize.STRING(50),
//         primaryKey: true
//     },
//     name: Sequelize.STRING(100),
//     gender: Sequelize.BOOLEAN,
//     birth: Sequelize.STRING(10),
//     createdAt: Sequelize.BIGINT,
//     updatedAt: Sequelize.BIGINT,
//     version: Sequelize.BIGINT
// }, {
//     timestamps: false
// });

// var now = Date.now();
// (async() => {
//     var dog = await Pet.create({
//         id: 'd-' + now,
//         name: 'Mary',
//         gender: false,
//         birth: '2008-08-08',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log('created: ' + JSON.stringify(dog));
// })();

// (async() => {
//     var pets = await Pet.findAll();
//     console.log(`find ${pets.length} pets:`);
//     pets.forEach(async(p) => {
//         p.gender = true;
//         p.updatedAt = Date.now();
//         p.version++;
//         await p.save();
//     })
// })();

app.use(async(ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    var startTime = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - startTime;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if (!isProduction) {
    console.log(isProduction);
    app.use(staticFiles('/static/', __dirname + '/static'));
}

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

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(rest.restify());

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
// app.use(async(ctx, next) => {
//     ctx.state.user = parseUser(ctx.cookies.get('name') || '');
//     await next();
// });
// module.exports = app;
let server = app.listen(3000);
// let wss = new WebSocketServer({ server: server });
console.log('app start!');
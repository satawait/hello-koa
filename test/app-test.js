const
    request = require('supertest'),
    app = require('../app');

describe('#test koa app', () => {

    let server = app.listen(3000);

    describe('#test server', () => {

        it('#test GET /', async() => {
            let res = await request(server)
                .get('/')
                .expect('Content-Type', /text\/html/);
        });

        it('#test GET /path?name=Bob', async() => {
            let res = await request(server)
                .get('/path?name=Bob')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, Bob!</h1>');
        });
    });
});
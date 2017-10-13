const db = require('./db');

module.exports = db.defineModel('pets', {
    name: db.STRING(100),
    birth: db.STRING(20),
    gender: db.BOOLEAN
});
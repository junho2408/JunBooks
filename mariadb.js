const mariadb = require('mysql2');

const connection = mariadb.createConnection({
    host: process.env.DB_ADDRESS,
    user: 'root',
    password : 'root',
    database: 'JunBooks',
    dateStrings : true
});

module.exports = connection
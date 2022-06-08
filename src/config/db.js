const mysql = require("mysql2");
const dotenv = require("dotenv");

const config = dotenv.config().parsed;

const db = mysql.createConnection({
    user: config.MYSQL_USER,
    host: config.MYSQL_HOST,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
});

module.exports = db;

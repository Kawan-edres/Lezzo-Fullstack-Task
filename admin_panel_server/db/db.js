const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '', // Provide an empty string as the default value
  database: process.env.DB_NAME,
});

module.exports = pool;

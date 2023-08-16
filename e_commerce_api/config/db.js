const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "e_commerce",
  password: "asdf4321",
});

module.exports = pool.promise();

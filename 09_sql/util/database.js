const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-database",
  password: "Vir@2003",
});

module.exports = pool.promise();

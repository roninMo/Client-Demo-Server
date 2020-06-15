const mysql = require("mysql");

function getConnection() {
  return mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "Kieran30437",
    database: "insuranceDatabase",
  });
}

module.exports = getConnection;

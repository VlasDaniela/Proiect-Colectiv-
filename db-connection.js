var mysql = require("mysql")

var connection =
    mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "taskapp",
    })
connection.connect(function(error) {
    if (error) {
        throw error}else
        {
        console.log('connected to the db succesfuly!');}
      });

module.exports = connection;

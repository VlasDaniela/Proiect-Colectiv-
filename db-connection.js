var mysql = require('mysql')

const connection =
    mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "taskapp",
    })

module.exports = connection;

var mysql = require('mysql')
const util = require( 'util' );

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

function makeDb() {
        return {
          query( sql, args ) {
            return util.promisify( connection.query )
              .call( connection, sql, args );
          },
          close() {
            return util.promisify( connection.end ).call( connection );
          }
        };
      }

module.exports = {connection, makeDb };

// Import mysql module
const mysql = require("mysql2")

// Create connection to mysql server
const mysqlconnection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'js_db',
    port:3306
})

// Try to connect to db, throws an err obj if failed
mysqlconnection.connect((err) => {
    if(!err){
        console.log("connection done!")
    }else{
        console.log("connection fail :"+JSON.stringify(err))
    }
})

// Export connection instance to use in routes for database access
module.exports = mysqlconnection;
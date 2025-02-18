const mysql =require('mysql')
const connection =mysql.createPool({
    port:3307,
    host:"localhost",
    user:"root",
    password:"ram2021",
    database:"cookyourownfood",
    connectionLimit: 100,
})

module.exports.connection=connection;
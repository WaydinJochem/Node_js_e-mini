require("dotenv").config();
const {createPool}=require("mysql");
const connection = createPool({
    host: process.env.host,
    database: process.env.name,
    user: process.env.user,
    password: process.env.pwd,
    multipleStatements: true,
    connectionLimit: 30
});
module.exports = connection;
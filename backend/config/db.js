const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Kết nối đến CSDL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
    
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        throw err;
    }
    console.log('Connected to database');
});

module.exports = db;

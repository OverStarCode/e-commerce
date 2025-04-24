require('dotenv').config();
const mysql = require('mysql');

const DbConnection = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    connection.connect((err) => {
        if (err) {
            console.error('MySQL connection failed:', err.stack);
            return;
        }
        console.log('Connected to MySQL on Railway!');
    });

    return connection;
};

module.exports = DbConnection;

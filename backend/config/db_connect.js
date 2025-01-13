const mysql = require('mysql');

const DbConnection = ()=>{
console.log(process.env.DB_USERNAME)
const connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_BASSWORD || '',
    database: process.env.DB_DATABASE || 'ecommerce'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL');
    
});
return connection;
}

module.exports = DbConnection;

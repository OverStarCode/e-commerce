const DbConnection = require("../config/db_connect");

const createTableProducts = async  (req, res) => {
    const db = DbConnection();
 
    db.query(
      "CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description TEXT , price TEXT, resturant TEXT )",
      (err, result) => {
        if (err) throw err;
        res.send("Table created");
      }
      
    );
 }

 const createTableBaskets = async  (req, res) => {
 
    const db = DbConnection();
 
 
    db.query(
      "CREATE TABLE IF NOT EXISTS baskets (id INT AUTO_INCREMENT PRIMARY KEY, product_id INT, user_id INT )",
      (err, result) => {
        if (err) throw err;
        res.send("Table created");
      })
 }

 module.exports = {createTableProducts,createTableBaskets};
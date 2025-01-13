
const DbConnection = require("../config/db_connect");


const getAllProducts = async (req, res) => {
    const db = DbConnection();

 
    db.query("SELECT * FROM products", 
      
      (err, rows, fields) => {
       if(err) throw err;
       res.send(rows);
    });
 }
const getAllProductsForUser = async (req, res) => {
    const db = DbConnection();

    const {user_id} = req.params
 
    db.query("SELECT * FROM products where user_id  =?", 
      [user_id],
      (err, rows, fields) => {
       if(err) throw err;
       res.send(rows);
    });
 }

 const getProduct = async (req, res) => {
 
 
    const db = DbConnection();
 
    const { id } = req.params;
 
    console.log(id)
 
    db.query("SELECT * FROM products WHERE id =?", [id], (err, rows) => {
       if(err) throw err;
       res.send(rows[0]);
    });
 }
 const addProduct = async  (req, res) => {
    const db = DbConnection();
   const {user_id} = req.params
    const { name, description, price, restaurant,category } = req.body;
 
    db.query(
      "INSERT INTO products (name, description, price, restaurant,category,user_id) VALUES (?,?,?,?,?,?)",
      [name, description, price, restaurant,category,user_id],
      (err, result) => {
        if (err) throw err;
        res.send(`<h1>New product added with ID: ${result.insertId}</h1>`);
      }
    );
 }

 const deleteProduct = async (req, res) => {
    const db = DbConnection();
 
    const { id } = req.params;
 
    db.query("DELETE FROM products WHERE id =?", [id], (err, result) => {
       if (err) throw err;
       res.send(`<h1>Product deleted with ID: ${id}</h1>`);
    });
 }
 const updateProduct = async (req, res) => {
    const db = DbConnection();
 
    const { id ,user_id} = req.params;
    const { name, description, price, restaurant ,category} = req.body;
 
    db.query(
      "UPDATE products SET name =?, description =?, price =?, restaurant =? ,category =? WHERE id =? AND user_id =?",
      [name, description, price, restaurant,category, id,user_id],
      (err, result) => {
        if (err) throw err;
        res.send(`<h1>Product updated with ID: ${id}</h1>`);
      }
    );
 }

 const filterProducts = async (req, res) => {
    const db = DbConnection();
  
    const { selectedCategory, searchText } = req.body;
  
    console.log(selectedCategory,searchText)
    // Base SQL query
    let query = "SELECT * FROM products WHERE 1=1"; // 1=1 ensures base query is always true
    const params = [];
  
    // Add condition for selectedCategory if it is not empty
    if (selectedCategory && selectedCategory.length > 0) {
      query += " AND category IN (?)";
      params.push(selectedCategory);
    }
  
    // Add condition for searchText if it is not empty
    if (searchText && searchText.trim() !== "") {
      query += " OR (name LIKE CONCAT('%', ?, '%') OR description LIKE CONCAT('%', ?, '%'))";
      params.push(searchText, searchText);
    }
  
    // Execute the query
    db.query(query, params, (err, rows) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "An error occurred while filtering products." });
        return;
      }
  
      // Handle no matching rows
      // if (!rows || rows.length === 0) {
      //   res.json.status(204).json({ message: "No products match the search criteria." });
      // }
  
      // Send matching rows
      res.status(200).json(rows);
    });
  }

  module.exports = { getAllProducts, getProduct, addProduct, deleteProduct, updateProduct, filterProducts ,getAllProductsForUser};
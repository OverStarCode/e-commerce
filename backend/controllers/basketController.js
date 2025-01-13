const DbConnection = require("../config/db_connect");

const addToBasket = async (req, res) => {
  const db = DbConnection();

  const { product_id, user_id } = req.body;

  db.query(
    "INSERT INTO baskets (product_id, user_id) VALUES (?,?)",
    [product_id, user_id],
    (err, result) => {
      if (err) throw err;
      res.send(`<h1>Product added to basket with ID: ${result.insertId}</h1>`);
    }
  );
};

const checkItemInBasket = async (req, res) => {
  const db = DbConnection();

  const { product_id, user_id } = req.body;

  db.query(
    "SELECT * FROM baskets WHERE product_id =? AND user_id =?",
    [product_id, user_id],
    (err, rows) => {
      if (err) throw err;
      res.send(rows.length > 0);
    }
  );
};

const deleteFromBasket = async (req, res) => {
  const db = DbConnection();

  const { product_id, user_id } = req.body;

  db.query(
    "DELETE FROM baskets WHERE product_id =? AND user_id =?",
    [product_id, user_id],
    (err, result) => {
      if (err) throw err;
      res.send(`<h1>Product deleted from basket with ID: ${product_id}</h1>`);
    }
  );
};

const getBasketItems = async (req, res) => {
  const db = DbConnection();

  const { user_id } = req.params;

  db.query(
    "SELECT  * from baskets  join products on baskets.product_id = products.id where baskets.user_id = ?",
    [user_id], // replace with user_id from req.params

    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
};

const getUserBasketItems = async (req, res) => {
  const db = DbConnection();

  const { user_id } = req.params;

  // replace with user_id from req.params

  db.query(
    "SELECT * FROM  baskets as b JOIN    products p ON b.product_id = p.id WHERE  b.user_id = ?",
    [user_id], // replace with user_id from req.params
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );

};

module.exports = {
  addToBasket,
  checkItemInBasket,
  deleteFromBasket,
  getBasketItems,

  getUserBasketItems
};

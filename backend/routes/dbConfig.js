const express = require('express');
const { createTableProducts, createTableBaskets } = require('../controllers/dbConfigController');

const router = express.Router();

// Require controller modules
router.get("/create_table_products", createTableProducts)
 
 router.get("/create_table_baskets",createTableBaskets)

module.exports = router
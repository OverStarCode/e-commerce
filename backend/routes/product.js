const express = require('express');
const { getAllProducts, addProduct, deleteProduct, updateProduct, filterProducts, getProduct, getAllProductsForUser } = require('../controllers/productController');

const router = express.Router();



router.get("/products/:user_id", getAllProductsForUser);
router.get("/products", getAllProducts);
 
 router.post("/add_product/:user_id", addProduct)
 
 
 router.delete("/delete_product/:id",deleteProduct );
 
 router.post("/update_product/:id/:user_id", updateProduct);
 
 router.post("/filter_products", filterProducts);
 
 
 
 router.get("/get_product/:id", getProduct)

module.exports = router
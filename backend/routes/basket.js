const express = require('express');
const { addToBasket, checkItemInBasket, deleteFromBasket, getBasketItems, getUserBasketItems } = require('../controllers/basketController');

const router = express.Router();


router.post("/add_to_basket", addToBasket)

router.post("/check_item_in_basket", checkItemInBasket )

router.post("/delete_from_basket", deleteFromBasket)

router.get("/get_basket_items/:user_id", getBasketItems )

router.get("/get_user_basket_items/:user_id", getUserBasketItems )

module.exports = router
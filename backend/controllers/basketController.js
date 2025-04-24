const Basket = require("../models/Basket");
const Product = require("../models/Product");

// Add product to the basket
const addToBasket = async (req, res) => {
  const { product_id, user_id } = req.body;

  try {
    const newBasketItem = new Basket({
      product_id,
      user_id,
    });

    await newBasketItem.save();
    res.status(201).json({ message: "Product added to basket", basketId: newBasketItem._id });
  } catch (err) {
    res.status(500).json({ message: "Error adding to basket", error: err.message });
  }
};

// Check if an item is already in the basket
const checkItemInBasket = async (req, res) => {
  const { product_id, user_id } = req.body;

  try {
    const existingItem = await Basket.findOne({ product_id, user_id });

    if (existingItem) {
      return res.status(200).json({ exists: true });
    }

    res.status(200).json({ exists: false });
  } catch (err) {
    res.status(500).json({ message: "Error checking item in basket", error: err.message });
  }
};

// Delete product from the basket
const deleteFromBasket = async (req, res) => {
  const { product_id, user_id } = req.body;

  try {
    const result = await Basket.deleteOne({ product_id, user_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found in basket" });
    }

    res.status(200).json({ message: "Product deleted from basket" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting from basket", error: err.message });
  }
};

// Get all items in the user's basket
const getBasketItems = async (req, res) => {
  const { user_id } = req.params;

  try {
    const basketItems = await Basket.find({ user_id }).populate('product_id');

    if (basketItems.length === 0) {
      return res.status(404).json({ message: "No products in the basket" });
    }

    res.status(200).json(basketItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching basket items", error: err.message });
  }
};

// Get specific user basket items, including product details
const getUserBasketItems = async (req, res) => {
  const { user_id } = req.params;

  try {
    const basketItems = await Basket.find({ user_id }).populate('product_id');

    if (basketItems.length === 0) {
      return res.status(404).json({ message: "No products in the basket" });
    }

    res.status(200).json(basketItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching basket items", error: err.message });
  }
};

module.exports = {
  addToBasket,
  checkItemInBasket,
  deleteFromBasket,
  getBasketItems,
  getUserBasketItems,
};

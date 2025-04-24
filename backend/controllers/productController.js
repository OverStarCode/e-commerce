const Product = require("../models/Product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// Get all products for a specific user
const getAllProductsForUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const products = await Product.find({ user_id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products for user", error: err.message });
  }
};

// Get a specific product by ID
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { user_id } = req.params;
  const { name, description, price, restaurant, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      restaurant,
      category,
      user_id,
    });

    await newProduct.save();
    res.status(201).json({ message: "New product added", productId: newProduct._id });
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted", productId: id });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id, user_id } = req.params;
  const { name, description, price, restaurant, category } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, user_id },
      { name, description, price, restaurant, category },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found or user not authorized" });
    }

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

// Filter products based on category or search text
const filterProducts = async (req, res) => {
  const { selectedCategory, searchText } = req.body;

  try {
    const query = {};
    if (selectedCategory && selectedCategory.length > 0) {
      query.category = { $in: selectedCategory }; // Using $in for matching any selected category
    }
    if (searchText && searchText.trim() !== "") {
      query.$or = [
        { name: { $regex: searchText, $options: "i" } }, // Case-insensitive search in 'name'
        { description: { $regex: searchText, $options: "i" } }, // Case-insensitive search in 'description'
      ];
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error filtering products", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsForUser,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  filterProducts,
};

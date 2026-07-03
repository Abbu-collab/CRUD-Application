const Product = require("../models/Product");

const isMongoUnavailable = (error) =>
  error?.name === "MongooseServerSelectionError" ||
  error?.name === "MongoNetworkError";

const createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    const newProduct = await Product.create({
      name,
      price,
      category,
      description,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    if (isMongoUnavailable(error)) {
      return res
        .status(503)
        .json({
          message: "Database unavailable. Start MongoDB to save products.",
        });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error('createProduct error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    if (isMongoUnavailable(error)) {
      return res.status(200).json([]);
    }
    console.error('getProducts error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    if (isMongoUnavailable(error)) {
      return res
        .status(503)
        .json({
          message: "Database unavailable. Start MongoDB to update products.",
        });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product id' });
    }
    console.error('updateProduct error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    if (isMongoUnavailable(error)) {
      return res
        .status(503)
        .json({
          message: "Database unavailable. Start MongoDB to delete products.",
        });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product id' });
    }
    console.error('deleteProduct error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };

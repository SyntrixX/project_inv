// Product Controller
// Handles all product-related business logic

// Sample product data (in a real application, this would come from a database)
// Product schema: { id, name, price, description }
let products = [
  { id: 1, name: 'Sample Product', price: 100, description: 'A product description' }
];

// Get all products
const getAllProducts = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get product by ID
const getProductById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new product
const createProduct = (req, res) => {
  try {
    const { name, price, description } = req.body;
    
    // Basic validation
    if (!name || !price || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, price, and description'
      });
    }
    
    const newProduct = {
      id: products.length + 1,
      name,
      price: parseFloat(price),
      description
    };
    
    products.push(newProduct);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update product
const updateProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, description } = req.body;
    
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Update product fields
    if (name) products[productIndex].name = name;
    if (price) products[productIndex].price = parseFloat(price);
    if (description) products[productIndex].description = description;
    
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: products[productIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Delete product
const deleteProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

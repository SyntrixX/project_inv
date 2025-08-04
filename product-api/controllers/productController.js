// Product Controller
// Handles all product-related business logic

// Sample product data (in a real application, this would come from a database)
// Product schema: { id, name, price, description }
let products = [
  { id: 1, name: 'Sample Product', price: 100, description: 'A product description' },
  { id: 2, name: 'Running Shoes', price: 89.99, description: 'Comfortable running shoes for daily exercise' },
  { id: 3, name: 'Laptop Computer', price: 1299.99, description: 'High-performance laptop for work and gaming' },
  { id: 4, name: 'Basketball Shoes', price: 149.99, description: 'Professional basketball shoes with great grip' },
  { id: 5, name: 'Wireless Headphones', price: 199.99, description: 'Premium wireless headphones with noise cancellation' },
  { id: 6, name: 'Dress Shoes', price: 129.99, description: 'Elegant leather dress shoes for formal occasions' },
  { id: 7, name: 'Smartphone', price: 699.99, description: 'Latest smartphone with advanced camera features' },
  { id: 8, name: 'Hiking Boots', price: 179.99, description: 'Durable hiking boots for outdoor adventures' },
  { id: 9, name: 'Office Chair', price: 299.99, description: 'Ergonomic office chair for comfortable work' },
  { id: 10, name: 'Tennis Shoes', price: 119.99, description: 'Lightweight tennis shoes for court performance' },
  { id: 11, name: 'Gaming Mouse', price: 79.99, description: 'High-precision gaming mouse with RGB lighting' },
  { id: 12, name: 'Winter Boots', price: 159.99, description: 'Warm winter boots for cold weather protection' }
];

// Get all products with pagination support
const getAllProducts = (req, res) => {
  try {
    const { page, limit } = req.query;
    
    // If no pagination parameters, return all products
    if (!page && !limit) {
      return res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    }
    
    // Parse pagination parameters
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    
    // Validate pagination parameters
    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page and limit must be positive numbers'
      });
    }
    
    // Calculate pagination
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    // Calculate pagination info
    const totalPages = Math.ceil(products.length / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;
    
    res.status(200).json({
      success: true,
      count: paginatedProducts.length,
      totalCount: products.length,
      pagination: {
        currentPage: pageNum,
        totalPages,
        hasNextPage,
        hasPrevPage,
        limit: limitNum
      },
      data: paginatedProducts
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

// Search products by name or description
const searchProducts = (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const searchTerm = q.toLowerCase().trim();
    
    // Filter products that contain the search term in name or description
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
    );
    
    res.status(200).json({
      success: true,
      count: filteredProducts.length,
      searchTerm: q,
      data: filteredProducts
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
  deleteProduct,
  searchProducts
};

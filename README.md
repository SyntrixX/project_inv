# Simple Product Inventory

API (Node.js)

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- npm (comes with Node.js)

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd product-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Server

#### Option 1: Using Node.js
```bash
node app.js
```

#### Option 2: Using Nodemon (recommended for development)
```bash
nodemon app.js
```

The server will start on `http://localhost:3000`

### Verify Installation
Once the server is running, you can verify it's working by visiting:
- `http://localhost:3000` - API welcome page
- `http://localhost:3000/api/products` - Get all products

### Available Scripts
- `node app.js` - Start the server
- `nodemon app.js` - Start the server with auto-restart on file changes

## Technologies Used

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js v4.x** - Web framework for building REST APIs
- **JavaScript (ES6+)** - Programming language

### Development Tools
- **Nodemon** - Auto-restart server during development
- **npm** - Package manager

### Features Implemented
- **REST API** - Complete CRUD operations (Create, Read, Update, Delete)
- **In-Memory Storage** - Products stored in JavaScript array
- **JSON Responses** - All API responses in JSON format
- **Error Handling** - Comprehensive error handling with proper HTTP status codes
- **CORS Support** - Cross-Origin Resource Sharing enabled
- **Input Validation** - Request validation for required fields

## Bonus Tasks Completed ✅

### 1. Search Functionality
- **Endpoint**: `GET /api/products/search?q=shoe`
- **Feature**: Search products by name or description
- **Implementation**: Case-insensitive search across product name and description fields
- **Example**: `/api/products/search?q=shoe` returns all products containing "shoe"

### 2. Pagination
- **Endpoint**: `GET /api/products?page=1&limit=10`
- **Feature**: Paginated product listing
- **Implementation**: 
  - `page` parameter for page number
  - `limit` parameter for items per page
  - Returns pagination metadata (total pages, current page, has next/previous)
- **Example**: `/api/products?page=1&limit=10` returns first 10 products with pagination info

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (supports pagination) |
| GET | `/api/products/search?q=term` | **BONUS**: Search products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update existing product |
| DELETE | `/api/products/:id` | Delete product |

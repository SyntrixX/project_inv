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
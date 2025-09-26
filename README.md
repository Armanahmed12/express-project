
# E-commerce API (Express + TypeScript + MongoDB)

A simple E-commerce API built with **Express.js, TypeScript, and MongoDB (Mongoose)**.

---

## Installation & Run Locally

### 1️⃣ Clone the repository
```bash
git clone : https://github.com/Armanahmed12/express-project.git

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
Add your configuration:
PORT=3000
DATABASE_URL=mongodb://127.0.0.1:27017/shopping-db(your local mongodb connection string will come here)

4️⃣ Run in development
npm run start:dev

5️⃣ Run in production
npm run build
npm start

API Endpoints
Products
POST /api/products → Create product
GET /api/products → Get all products
GET /api/products/:productId → Get product by ID
PUT /api/products/:productId → Update product
DELETE /api/products/:productId → Delete product


Orders
POST /api/orders → Create order
GET /api/orders → Get all orders
GET /api/orders?email=user@example.com → Get orders by email

Author : Arman Ahmed
GitHub : https://github.com/Armanahmed12



{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ]
}

import app from './app.js';
import mongoose from 'mongoose';
import { config } from './app/config/index.js';

const startServer = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log('MongoDB connected');

    app.listen(config.port, () => {
      console.log(`the server is running on PORT ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // exit process if DB connection fails
  }
};

startServer();

{
    "version" : 2,
    "builds" : [
        {
            "src" : "dist/server.js",
            "use" : "@vercel/node"
        }
    ],
    "routes" : [
        {
            "src" : "/(.*)",
            "dest" : "dist/server.js"
        }
    ]
}

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

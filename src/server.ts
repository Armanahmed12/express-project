// server.ts
import app from './app.js';
import mongoose from 'mongoose';
import { config } from './app/config/index.js';
import { VercelRequest, VercelResponse } from '@vercel/node';

let isConnected = false;

const connectDB = async () => {
  if (!isConnected) {
    await mongoose.connect(config.databaseUrl as string);
    isConnected = true;
    console.log('✅ MongoDB connected');
  }
};

// Handler for Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  await connectDB();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return app(req as any, res as any);
};

// Run locally with listen()
if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => {
    app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
    });
  });
}

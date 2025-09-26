import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './app/modules/product/product.route.js';
import orderRouter from './app/modules/order/order.route.js';

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('WELCOME TO EXPRESS WORLD!');
});

// 404 handler (must be after all routes)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;

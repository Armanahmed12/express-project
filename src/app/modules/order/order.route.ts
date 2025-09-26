import express from 'express';
import { OrderControllers } from './order.controller.js';

const orderRouter = express.Router();

orderRouter.post('/', OrderControllers.createNewOrder);
orderRouter.get('/', OrderControllers.getAllOrders);

export default orderRouter;

import { Schema, model } from 'mongoose';
import { TOrderItem } from './order.interface.js';

const OrderItemSchema = new Schema<TOrderItem>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const OrderItemModel = model<TOrderItem>('Order', OrderItemSchema);

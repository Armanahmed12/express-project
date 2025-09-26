// models/product.model.ts
import { Schema, model } from 'mongoose';
import { IInventory, IProduct, IProductVariant } from './product.interface.js';

const productVariantSchema = new Schema<IProductVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false } // prevent auto _id for subDocs
);

const inventorySchema = new Schema<IInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false } // prevent auto _id for subDocs
);

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  variants: [productVariantSchema],
  inventory: inventorySchema,
});

// 👇 Create the model
export const ProductModel = model<IProduct>('Product', productSchema);

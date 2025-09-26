// validation/product.validation.ts
import { z } from 'zod';

const productVariantSchema = z.object({
  type: z.string().min(1, 'Variant type is required'),
  value: z.string().min(1, 'Variant value is required'),
});

const inventorySchema = z.object({
  quantity: z.number().int().nonnegative({
    message: 'Inventory quantity must be a non-negative integer',
  }),
  inStock: z.boolean(),
});

export const productValidationSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).nonempty('At least one tag is required'),
  variants: z
    .array(productVariantSchema)
    .nonempty('At least one variant is required'),
  inventory: inventorySchema,
});

// Infer the TypeScript type
export type ProductInput = z.infer<typeof productValidationSchema>;

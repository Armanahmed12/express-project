import { z } from 'zod';

export const orderItemZodSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  productId: z.string().min(1, { message: 'Product ID is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
});

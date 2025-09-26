import express from 'express';
import { ProductControllers } from './product.controller.js';

const productRouter = express.Router();

// this router for both getting all products from db and getting all data based on query text
productRouter.get('/', ProductControllers.getAllProducts);

productRouter.post('/create-product', ProductControllers.createNewProduct);
productRouter.get('/:productId', ProductControllers.getSpecificProById);
productRouter.patch(
  '/:productId',
  ProductControllers.updateSpecificProByIdIntoDB
);
productRouter.delete('/:productId', ProductControllers.deleteProductById);

export default productRouter;

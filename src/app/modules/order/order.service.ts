import { ProductModel } from '../product/product.model.js';
import { TOrderItem } from './order.interface.js';
import { OrderItemModel } from './order.model.js';

const crateNewOrderIntoDB = async (orderData: TOrderItem) => {
  const res = await OrderItemModel.create(orderData);
  return res;
};

const getAllOrdersFromDB = async () => {
  const allProducts = OrderItemModel.find({});
  return allProducts;
};

const findOrdersByQueryEmailFromDB = async (userEmail: string) => {
  const res = OrderItemModel.find({
    email: { $regex: userEmail, $options: 'i' },
  });
  return res;
};

// ==================== Update the quantity and status of the matched products by the order's productId Field's value and save again into DB======================= //
const updateTheMatchedPro = async (order: TOrderItem) => {
  const product = await ProductModel.findById(order.productId);
  if (!product || product.inventory.quantity < order.quantity) {
    return false;
  }

  product.inventory.quantity -= order.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();
  return true;
};

export const OrderServices = {
  crateNewOrderIntoDB,
  getAllOrdersFromDB,
  findOrdersByQueryEmailFromDB,
  updateTheMatchedPro,
};

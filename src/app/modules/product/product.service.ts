import { IProduct } from './product.interface.js';
import { ProductModel } from './product.model.js';

const createNewProductIntoDB = async (product: IProduct) => {
  const res = await ProductModel.create(product);
  return res;
};

const getAllProductsFromDB = async () => {
  const allProducts = ProductModel.find({});
  return allProducts;
};

const getSpecificProByIdFromDB = async (productId: string) => {
  const product = await ProductModel.findById(productId);
  return product;
};

const updateProByIdIntoDB = async (productId: string, updateInfo: object) => {
  const result = await ProductModel.findByIdAndUpdate(productId, updateInfo, {
    new: true, // returns the updated document
    runValidators: true, // runs schema validation
  });
  return result;
};

// product delete from db
const deleteProFromDB = async (productId: string) => {
  console.log(productId);
  const res = await ProductModel.findByIdAndDelete(productId);
  return res;
};

const findProductsByQueryTextFromDB = async (searchTerm: string) => {
  const res = ProductModel.find({
    name: { $regex: searchTerm, $options: 'i' },
  });
  return res;
};

// exporting the productServices
export const ProductServices = {
  createNewProductIntoDB,
  getAllProductsFromDB,
  getSpecificProByIdFromDB,
  updateProByIdIntoDB,
  deleteProFromDB,
  findProductsByQueryTextFromDB,
};

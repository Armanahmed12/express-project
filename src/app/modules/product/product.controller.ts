import { Request, Response } from 'express';
import { ProductServices } from './product.service.js';
import { productValidationSchema } from './product.validation.js';

const createNewProduct = async (req: Request, res: Response) => {
  try {
    const userGivenData = req.body;

    const result = productValidationSchema.safeParse(userGivenData);
    // if there's validation error
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "There's a validation err!",
        error: result.error.flatten(),
      });
      return;
    }

    const createdData = await ProductServices.createNewProductIntoDB(
      result.data
    );
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: createdData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      err: error,
    });
  }
};

// if there can be found query searchTerm text then this func will find data based on that query searchTerm inside if clause, otherwise it will fetch all the data from db inside the else clause.
const getAllProducts = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string;

  try {
    // if there is searchTerm
    if (searchTerm) {
      const foundDocsBySearchTerm =
        await ProductServices.findProductsByQueryTextFromDB(searchTerm);
      res.status(200).json({
        success: true,
        message: "Products matching search term 'iphone' fetched successfully!",
        data: foundDocsBySearchTerm,
      });
    } else {
      //  if there is no searchTerm
      const result = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      err: error,
    });
  }
};

const getSpecificProById = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getSpecificProByIdFromDB(
      req.params.productId as string
    );
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      err: error,
    });
  }
};

// find product in mongodb and update that
const updateSpecificProByIdIntoDB = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const desiredUpdateInfo = req.body;
    console.log(productId, desiredUpdateInfo, 'See the Info-');
    const updatedData = await ProductServices.updateProByIdIntoDB(
      productId as string,
      desiredUpdateInfo
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      err: error,
    });
  }
};

// find and delete product from db by its ID
const deleteProductById = async (req: Request, res: Response) => {
  try {
    await ProductServices.deleteProFromDB(req.params.productId as string);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      err: error,
    });
  }
};

export const ProductControllers = {
  createNewProduct,
  getAllProducts,
  getSpecificProById,
  updateSpecificProByIdIntoDB,
  deleteProductById,
};

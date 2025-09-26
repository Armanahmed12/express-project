import { Request, Response } from 'express';
import { OrderServices } from './order.service.js';
import { orderItemZodSchema } from './order.validation.js';
// import { ProductModel } from "../product/product.model";

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const userGivenData = req.body;

    const result = orderItemZodSchema.safeParse(userGivenData);
    // if there's order validation error by zod orderSchema
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "There's a validation err!",
        error: result.error.flatten(),
      });
      return;
    }
    const validatedOrderData = result.data;

    //   update the quantity and status of the matched product which has a _id that contains the order's productIdField's value

    const isUpdated =
      await OrderServices.updateTheMatchedPro(validatedOrderData);
    if (!isUpdated) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
      return;
    }

    //   this code finally creating the order after updating the matched product
    const createdOrder =
      await OrderServices.crateNewOrderIntoDB(validatedOrderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: createdOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      err: error,
    });
  }
};

// if there can be found userEmail as query then this func will find data based on that email inside if clause, otherwise it will fetch all the orders from db inside the else clause.
const getAllOrders = async (req: Request, res: Response) => {
  const userEmail = req.query.email as string;

  try {
    // if the email exists
    if (userEmail) {
      const foundDocsByEmail =
        await OrderServices.findOrdersByQueryEmailFromDB(userEmail);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: foundDocsByEmail,
      });
    } else {
      //  if UserEmail doesn't exist
      const fetchedOrders = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: fetchedOrders,
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

export const OrderControllers = {
  createNewOrder,
  getAllOrders,
};

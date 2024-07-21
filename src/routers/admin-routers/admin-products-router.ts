import express, { Router } from "express";
import productsController from "../../controllers/products-controller";


export const adminProductsRouter: Router = express.Router()

adminProductsRouter.post('/', productsController.create)
adminProductsRouter.patch('/productId', productsController.update)

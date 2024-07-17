import express, { Router } from "express";
import productsController from "../../controllers/products-controller";


export const adminProductsRouter: Router = express.Router()

adminProductsRouter.post('/create', productsController.create)

import express, { Router } from "express";
import productsController from "../controllers/products-controller";
import authMiddleware from "../middlewares/auth-middleware";


export const productsRouter: Router = express.Router()

productsRouter.get('/', authMiddleware, productsController.getProducts)

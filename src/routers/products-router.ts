import express, { Router } from "express";
import productsController from "../controllers/products-controller";


export const productsRouter: Router = express.Router()

productsRouter.get('/', productsController.getProducts)

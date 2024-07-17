import express, { Router } from "express";
import { adminCategoriesRouter } from "./admin-categories-router";
import { adminProductsRouter } from "./admin-products-router";


export const adminRouter: Router = express.Router()

adminRouter.use('/categories', adminCategoriesRouter)
adminRouter.use('/products', adminProductsRouter)
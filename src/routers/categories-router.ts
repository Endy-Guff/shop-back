import express, { Router } from "express";
import categoriesController from "../controllers/categories-controller";
import authMiddleware from "../middlewares/auth-middleware";


export const categoriesRouter: Router = express.Router()

categoriesRouter.get('/', authMiddleware, categoriesController.getCategories)

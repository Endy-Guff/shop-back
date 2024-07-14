import express, { Router } from "express";
import categoriesController from "../controllers/categories-controller";


export const categoriesRouter: Router = express.Router()

categoriesRouter.get('/', categoriesController.getCategories)

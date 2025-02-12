import express, { Router } from "express";
import categoriesController from "../../controllers/categories-controller";


export const adminCategoriesRouter: Router = express.Router()

adminCategoriesRouter.post('/', categoriesController.create)
adminCategoriesRouter.patch('/:categoryId', categoriesController.update)

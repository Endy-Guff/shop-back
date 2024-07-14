import express, { Router } from "express";
import { adminCategoriesRouter } from "./admin-categories-router";


export const adminRouter: Router = express.Router()

adminRouter.use('/categories', adminCategoriesRouter)
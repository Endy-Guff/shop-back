import express, { Router } from "express";
import reviewsController from "../controllers/reviews-controller";
import authMiddleware from "../middlewares/auth-middleware";


export const reviewsRouter: Router = express.Router()

reviewsRouter.get('/:productId', reviewsController.get)
reviewsRouter.post('/:productId', authMiddleware, reviewsController.create)
reviewsRouter.patch('/:reviewId', authMiddleware, reviewsController.update)


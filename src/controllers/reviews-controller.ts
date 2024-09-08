import { Request, Response, NextFunction } from 'express'
import productsService from '../services/products-service'
import { IReviewSchema } from '../models/review-model'
import reviewsService from '../services/reviews-service'
import { IProductSchema } from '../models/product-model'

class ReviewsController {
    async get(req: Request<{ productId: IProductSchema['id'] }>, res: Response, next: NextFunction) {
        try {
            const reviews = await reviewsService.get(req.params.productId)
            return res.json(reviews)
        } catch (e) {
            next(e)
        }
    }

    async create(req: Request<{ productId: IProductSchema['id'] }, void, Omit<IReviewSchema, 'userId' | 'productId' | 'id' | 'createdAt' | 'updatedAt'>>, res: Response, next: NextFunction) {
        try {
            const reviewsParams = req.body
            const { accessToken } = req.cookies
            const review = await reviewsService.create({ ...reviewsParams, productId: req.params.productId }, accessToken)
            return res.json(review)
        } catch (e) {
            next(e)
        }
    }

    async update(req: Request<{ reviewId: IReviewSchema['id'] }, void, Partial<Omit<IReviewSchema, 'id' | 'createdAt' | 'updatedAt'>>>, res: Response, next: NextFunction) {
        try {
            const reviewId = req.params.reviewId
            const newReview = req.body
            const product = await reviewsService.update(reviewId, newReview)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }
}

export default new ReviewsController()
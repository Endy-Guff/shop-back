import ApiError from "../exceptions/api-error";
import { IProductSchema } from "../models/product-model";
import ProductModel from '../models/product-model'
import ReviewModel from '../models/review-model'
import { UploadedFile } from 'express-fileupload';
import FileService from './file-service'
import { IReviewSchema } from "../models/review-model";
import tokenService from "./token-service";

class ReviewsService {
    async get(productId: IProductSchema['id']) {
        return ReviewModel.find({ productId })
    }

    async create(reviewParams: Omit<IReviewSchema, 'userId' | 'id' | 'createdAt' | 'updatedAt'>, accessToken: string) {
        const product = await ProductModel.findById(reviewParams.productId)
        if (!product) {
            throw ApiError.BadRequest(`Товар не найден`)
        }
        const user = tokenService.validateAccessToken(accessToken)
        if (!user) {
            throw ApiError.BadRequest(`Пользователь не найден`)
        }
        const review = await ReviewModel.create({ ...reviewParams, userId: user.id })
        return review
    }

    async update(id: IReviewSchema['id'], newReview: Partial<Omit<IReviewSchema, 'id' | 'createdAt' | 'updatedAt'>>) {
        try {
            const updatedData = await ReviewModel.findByIdAndUpdate(
                id,
                newReview,
                { new: true }
            );

            if (updatedData) {
                return updatedData
            } else {
                throw new ApiError(404, 'Данные не найдены')
            }
        } catch (error) {
            throw ApiError.ServerError()
        }
    }
}
export default new ReviewsService()

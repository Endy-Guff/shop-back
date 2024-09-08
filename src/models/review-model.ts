import { model, ObjectId, Schema } from "mongoose"
import { transformMongoId } from "../tools/transform-mongo-id"
import { IUserSchema } from "./user-model"
import { IProductSchema } from "./product-model"

export interface IReviewSchema {
    id: string
    text: string
    rating: number
    userId: string
    productId: string
    createdAt: string
    updatedAt: string

}

const ReviewSchema = new Schema<IReviewSchema>({
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    userId: { type: String, ref: 'User', required: true },
    productId: { type: String, ref: 'Product', required: true },
    createdAt: { type: String, default: () => new Date().toISOString() },
    updatedAt: { type: String, default: () => new Date().toISOString() }
})

transformMongoId(ReviewSchema)

ReviewSchema.pre('save', function (next) {
    this.updatedAt = new Date().toISOString();
    next();
});

export default model('Review', ReviewSchema)
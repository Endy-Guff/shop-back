import { model, Schema } from "mongoose"
import { transformMongoId } from "../tools/transform-mongo-id"

export interface ICategorySchema {
    id: string
    name: string
    createdAt: string
    updatedAt: string

}

const CategorySchema = new Schema<ICategorySchema>({
    name: { type: String, unique: true, required: true },
    createdAt: { type: String, default: () => new Date().toISOString() },
    updatedAt: { type: String, default: () => new Date().toISOString() }
})

transformMongoId(CategorySchema)

CategorySchema.pre('save', function (next) {
    this.updatedAt = new Date().toISOString();
    next();
});

export default model('Category', CategorySchema)
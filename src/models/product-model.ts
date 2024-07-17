import { transformMongoId } from "../tools/transform-mongo-id";
import { model, Schema } from "mongoose"


export interface IProductSchema {
    name: string
    price: number
    category: string[]
    createdAt: string
    updatedAt: string
    description?: string
    stock?: number
}

const ProductSchema = new Schema<IProductSchema>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    stock: { type: Number, default: 0 },
    createdAt: { type: String, default: () => new Date().toISOString() },
    updatedAt: { type: String, default: () => new Date().toISOString() }
});

transformMongoId(ProductSchema)

ProductSchema.pre('save', function (next) {
    this.updatedAt = new Date().toISOString();
    next();
});

export default model('Product', ProductSchema)

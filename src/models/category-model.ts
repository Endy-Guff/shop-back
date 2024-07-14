import { model, Schema } from "mongoose"
import { transformMongoId } from "../tools/transform-mongo-id"

export interface ICategorySchema {
    id: string
    name: string

}

const CategorySchema = new Schema<ICategorySchema>({
    name: { type: String, unique: true, required: true },
})

transformMongoId(CategorySchema)

export default model('Category', CategorySchema)
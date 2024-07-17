import ApiError from "../exceptions/api-error";
import { IProductSchema } from "../models/product-model";
import ProductModel from '../models/product-model'

class ProductsService {
    async getProducts() {
        return ProductModel.find({})
    }

    async create(productParams: Omit<IProductSchema, 'createdAt' | 'updatedAt'>) {
        const candidate = await ProductModel.findOne({ name: productParams.name })
        if (candidate) {
            throw ApiError.BadRequest(`Товар ${productParams.name} уже существует`)
        }
        const category = await ProductModel.create(productParams)
        return category
    }
}
export default new ProductsService()

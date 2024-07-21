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

    async update(id: IProductSchema['id'], newProduct: Partial<Omit<IProductSchema, 'id' | 'createdAt' | 'updatedAt'>>) {
        try {
            const updatedData = await ProductModel.findByIdAndUpdate(
                id,
                newProduct,
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
export default new ProductsService()

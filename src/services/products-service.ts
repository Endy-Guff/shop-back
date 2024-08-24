import ApiError from "../exceptions/api-error";
import { IProductSchema } from "../models/product-model";
import ProductModel from '../models/product-model'
import { UploadedFile } from 'express-fileupload';
import FileService from './file-service'

class ProductsService {
    async getProducts() {
        return ProductModel.find({})
    }

    async create(productParams: Omit<IProductSchema, 'createdAt' | 'updatedAt'>, file?: UploadedFile | UploadedFile[]) {
        const candidate = await ProductModel.findOne({ name: productParams.name })
        if (candidate) {
            throw ApiError.BadRequest(`Товар ${productParams.name} уже существует`)
        }
        let photo
        if (file && !Array.isArray(file)) photo = await FileService.uploadFile(file, process.env.PRODUCT_PHOTO_STATIC_PATH)
        const product = await ProductModel.create({ ...productParams, photo })
        return product
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

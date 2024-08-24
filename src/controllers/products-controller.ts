import { Request, Response, NextFunction } from 'express'
import { IProductSchema } from '../models/product-model'
import productsService from '../services/products-service'

class ProductsController {
    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await productsService.getProducts()
            return res.json(categories)
        } catch (e) {
            next(e)
        }
    }

    async create(req: Request<{}, void, Omit<IProductSchema, 'createdAt' | 'updatedAt'>>, res: Response, next: NextFunction) {
        try {
            const productParams = req.body
            const file = req.files?.file
            const product = await productsService.create(productParams, file)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async update(req: Request<{ productId: IProductSchema['id'] }, void, Partial<Omit<IProductSchema, 'id' | 'createdAt' | 'updatedAt'>>>, res: Response, next: NextFunction) {
        try {
            const productId = req.params.productId
            const newProduct = req.body
            const product = await productsService.update(productId, newProduct)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }
}

export default new ProductsController()
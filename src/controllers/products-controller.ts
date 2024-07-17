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

    async create(req: Request<void, void, Omit<IProductSchema, 'createdAt' | 'updatedAt'>>, res: Response, next: NextFunction) {
        try {
            const productParams = req.body
            const product = await productsService.create(productParams)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }
}

export default new ProductsController()
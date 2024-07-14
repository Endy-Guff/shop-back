import { Request, Response, NextFunction } from 'express'
import { ICategorySchema } from "../models/category-model"
import categoriesService from '../services/categories-service'

class CategoriesController {
    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoriesService.getCategories()
            return res.json(categories)
        } catch (e) {
            next(e)
        }
    }

    async create(req: Request<void, void, { name: ICategorySchema['name'] }>, res: Response, next: NextFunction) {
        try {
            const { name } = req.body
            const category = await categoriesService.create(name)
            return res.json(category)
        } catch (e) {
            next(e)
        }
    }
}

export default new CategoriesController()
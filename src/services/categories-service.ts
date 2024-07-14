import ApiError from "../exceptions/api-error";
import CategoryModel, { ICategorySchema } from "../models/category-model";

class CategoriesService {
    async getCategories() {
        return CategoryModel.find({})
    }

    async create(name: ICategorySchema['name']) {
        const candidate = await CategoryModel.findOne({ name })
        if (candidate) {
            throw ApiError.BadRequest(`Категория ${name} уже существует`)
        }
        const category = await CategoryModel.create({ name })
        return category
    }
}
export default new CategoriesService()

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

    async update(id: ICategorySchema['id'], name?: ICategorySchema['name']) {
        try {
            const updatedData = await CategoryModel.findByIdAndUpdate(
                id,
                { name },
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
export default new CategoriesService()

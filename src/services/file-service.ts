import { UploadedFile } from 'express-fileupload';
import ApiError from '../exceptions/api-error';
import * as uuid from "uuid";
import sharp from "sharp";

class FileService {
    async uploadFile(file: UploadedFile, path?: string, resize: { width: number, height: number } = { width: 300, height: 300 }) {
        if (!path) throw ApiError.ServerError()
        if (file.size > 10000000) {
            throw ApiError.BadRequest('Загружаемыей файл не должен превышать 10мб')
        }

        const fileName = uuid.v4() + '.jpg'

        const toFilePromise = new Promise((resolve, reject) => {
            sharp(file.data)
                .resize(resize.width, resize.height)
                .toFile(path + '/' + fileName, (err) => {
                    if (err) {
                        reject(new ApiError(500, 'Ошибка при обработке изображения'))
                    } else {
                        resolve(fileName)
                    }
                })
        })

        await toFilePromise

        return fileName
    }
}

export default new FileService()
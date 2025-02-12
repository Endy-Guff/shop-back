import { ValidationError } from "express-validator";

export default class ApiError extends Error {
    status
    errors

    constructor(status: number, message: string, errors: string[] | ValidationError[] = []) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, "Пользователь неавторизован")
    }

    static BadRequest(message: string, errors: string[] | ValidationError[] = []) {
        return new ApiError(400, message, errors)
    }

    static ServerError(errors: string[] | ValidationError[] = []) {
        return new ApiError(500, 'Ошибка сервера', errors)
    }
}


import { Request, Response, NextFunction } from 'express'
import ApiError from '../exceptions/api-error'
import tokenService from '../services/token-service'
import { IUserSchema } from '../models/user-model'

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        const { accessToken } = req.cookies
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
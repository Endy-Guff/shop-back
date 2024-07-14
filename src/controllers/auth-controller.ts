import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';
import authService from '../services/auth-service';

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const error = ApiError.BadRequest('Ошибка при валидации', errors.array());
                next(error)
            }
            const { email, password, date, name } = req.body
            const userData = await authService.registration(email, password, date, name)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            })
            res.cookie('accessToken', userData.accessToken, {
                maxAge: 60 * 30 * 1000,
                secure: true,
            })
            return res.json(userData.user)
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const userData = await authService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            })
            res.cookie('accessToken', userData.accessToken, {
                maxAge: 60 * 30 * 1000,
                secure: true,
            })
            return res.json(userData.user)
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            await authService.logout(refreshToken)
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            return res.status(200).send()
        } catch (e) {
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link
            await authService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL || '')
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            })
            res.cookie('accessToken', userData.accessToken, {
                maxAge: 60 * 30 * 1000,
                secure: true,
            })
            return res.json(userData.user)
        } catch (e) {
            next(e)
        }
    }

    async me(req: Request, res: Response, next: NextFunction) {
        try {
            const { accessToken } = req.cookies
            const userData = await authService.me(accessToken)
            return res.json(userData)
        } catch (e) {
            next(e)

        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, oldPassword, newPassword } = req.body
            await authService.changePassword(email, oldPassword, newPassword)
            return res.status(200).send()
        } catch (e) {
            next(e)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await authService.delete(id)
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            return res.status(200).send()
        } catch (e) {
            next(e)
        }
    }

    async sendActivate(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body
            await authService.sendActivate(email)
            return res.status(200).send()
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()
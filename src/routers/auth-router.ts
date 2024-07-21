import express, { Router } from "express";
import { body } from "express-validator";
import AuthController from '../controllers/auth-controller'
import authMiddleware from "../middlewares/auth-middleware";

export const authRouter: Router = express.Router()


authRouter.post('/registration', body('email').isEmail(), body('password').isLength({
    min: 3,
    max: 32
}), AuthController.registration)
authRouter.post('/login', [
    body('email').isString().isEmail(),
    body('password').isString()
], AuthController.login)
authRouter.get('/logout', AuthController.logout)
authRouter.get('/activate/:link', AuthController.activate)
authRouter.get('/refresh', AuthController.refresh)
authRouter.get('/me', AuthController.me)
authRouter.post('/send-activate', [body('email').isString().isEmail()], AuthController.sendActivate)
authRouter.post('/change-password', [
    body('email').isString().isEmail(),
    body('oldPassword').isString(),
    body('newPassword').isString()
], authMiddleware, AuthController.changePassword)
authRouter.delete('/delete/:id', authMiddleware, AuthController.delete)
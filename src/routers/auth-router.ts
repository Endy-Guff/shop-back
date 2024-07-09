import express, { Router } from "express";
import { body } from "express-validator";
import AuthController from '../controllers/auth-controller'
import authMiddleware from "../middlewares/auth-middleware";

export const authRouter: Router = express.Router()


authRouter.post('/registration', body('email').isEmail(), body('password').isLength({
    min: 3,
    max: 32
}), AuthController.registration)
authRouter.post('/login', AuthController.login)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/activate/:link', AuthController.activate)
authRouter.get('/refresh', AuthController.refresh)
authRouter.get('/me', AuthController.me)
authRouter.post('/sendActivate', AuthController.sendActivate)
authRouter.post('/changePassword', authMiddleware, AuthController.changePassword)
authRouter.delete('/delete/:id', authMiddleware, AuthController.delete)
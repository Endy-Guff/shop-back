import ApiError from "../exceptions/api-error"
import UserModel, { IUserSchema } from "../models/user-model"
import bcrypt from "bcrypt";
import * as uuid from "uuid";
import tokenService from "./token-service";
import { ITokenSchema } from "../models/token-model";
import mailService from "./mail-service";
import { createUserDto } from "../tools/create-user-dto";

class AuthService {
    async registration(
        email: IUserSchema['email'],
        password: IUserSchema['password'],
        date: IUserSchema['registrationDate'],
        name: IUserSchema['name']) {
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({
            email,
            password: hashPassword,
            registrationDate: date,
            activationLink,
            name
        })
        const userDto = createUserDto(user)
        const tokens = tokenService.generateTokens(userDto)
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return { user: userDto, ...tokens }
    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }

        user.isActivated = true
        await user.save()
    }

    async login(email: IUserSchema['email'], password: IUserSchema['password'],) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('Пользователь не был найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Данные для входа неверны')
        }
        const userDto = createUserDto(user)

        const tokens = tokenService.generateTokens(userDto)
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return { user: userDto, ...tokens }
    }

    async logout(refreshToken: ITokenSchema['refreshToken']) {
        await tokenService.removeToken(refreshToken)
    }

    async me(accessToken: string) {
        const user = tokenService.validateAccessToken(accessToken)
        if (!user) {
            throw ApiError.UnauthorizedError()
        }
        return createUserDto(user)
    }

    async refresh(refreshToken: ITokenSchema['refreshToken']) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        if (user) {
            const userDto = createUserDto(user)

            const tokens = tokenService.generateTokens(userDto)
            await tokenService.saveToken(user.id, tokens.refreshToken)
            return { user: userDto, ...tokens }
        } else throw ApiError.UnauthorizedError()
    }

    async changePassword(
        email: IUserSchema['email'],
        password: IUserSchema['password'],
        newPassword: IUserSchema['password']
    ) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('Ошибка')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Пароль неверный')
        }
        const hashPassword = await bcrypt.hash(newPassword, 3)
        user.password = hashPassword
        await user.save()
    }

    async delete(id: IUserSchema['id']) {
        try {
            const res = await UserModel.findByIdAndDelete(id)
            return res
        } catch (e) {
            throw ApiError.BadRequest('Удалить не удалось')
        }
    }

    async sendActivate(email: IUserSchema['email']) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('Ошибка')
        }
        await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${user.activationLink}`)
    }
}

export default new AuthService()
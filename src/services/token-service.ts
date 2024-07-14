import jwt from "jsonwebtoken";
import TokenModel, { ITokenSchema } from '../models/token-model'
import { IUserSchema } from "../models/user-model.js";
import UserDto from "../dtos/userDto";

class TokenService {
    generateTokens(payload: UserDto) {
        const accessToken = jwt.sign(payload.toJSON(), process.env.JWT_ACCESS_SECRET || 'jwt-secret-key', { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload.toJSON(), process.env.JWT_REFRESH_SECRET || 'jwt-refresh-secret-key', { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await TokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenModel.create({ user: userId, refreshToken })
        return token
    }

    async removeToken(refreshToken: ITokenSchema['refreshToken']) {
        await TokenModel.deleteOne({ refreshToken })
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'jwt-secret-key')
            return userData as IUserSchema
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'jwt-refresh-secret-key')
            return userData as IUserSchema
        } catch (e) {
            return null
        }
    }

    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({ refreshToken })
        return tokenData
    }

    async deleteToken(userId: IUserSchema['id']) {
        await TokenModel.findOneAndDelete({ user: userId })
        return
    }
}

export default new TokenService()
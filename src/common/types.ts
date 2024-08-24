import { IUserSchema } from "../models/user-model";
import { Request } from 'express'
import { UploadedFile } from 'express-fileupload';

export type TRegistrationRequestBody = Pick<IUserSchema, 'email' | 'password' | 'registrationDate' | 'name'>

export interface IRequestWithCookies<P = {}, ResBody = any, ReqBody = any, ReqQuery = any> extends Request<P, ResBody, ReqBody, ReqQuery> {
    cookies: ICookies
}

export interface ICookies {
    refreshToken: string;
    accessToken: string;
}

export interface IChangePasswordRequestBody {
    email: IUserSchema['email'],
    oldPassword: IUserSchema['password']
    newPassword: IUserSchema['password']
}
